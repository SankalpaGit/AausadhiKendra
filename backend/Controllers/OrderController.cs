using backend.Data;
using backend.Models;
using backend.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using backend.DTOs.Request;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/order")]
[Authorize]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly StripeService _stripeService;

    public OrderController(AppDbContext dbContext, StripeService stripeService)
    {
        _dbContext = dbContext;
        _stripeService = stripeService;
    }

    [HttpPost("create")]
    public IActionResult CreateOrder([FromBody] CreateOrderRequest request)
    {
        // Get the authenticated donor's ID from JWT claims
        var donorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (donorIdClaim == null || !Guid.TryParse(donorIdClaim, out var donorId))
        {
            return Unauthorized(new { message = "Invalid or missing donor ID in token." });
        }

        // Get the donor's cart
        var cart = _dbContext.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Medicine)
            .FirstOrDefault(c => c.DonorId == donorId);

        if (cart == null || !cart.CartItems.Any())
        {
            return BadRequest(new { message = "Cart is empty." });
        }

        // Calculate total amount for sales medicines
        decimal totalAmount = 0;
        foreach (var item in cart.CartItems)
        {
            if (item.Medicine.Status == MedicineStatus.Sales)
            {
                totalAmount += item.Medicine.UnitPrice * item.Quantity;
            }
        }

        // Handle payment if totalAmount > 0
        if (totalAmount > 0)
        {
            var charge = _stripeService.CreateCharge(
                amount: totalAmount,
                currency: "usd",
                description: "Medicine Order Payment",
                stripeToken: request.StripeToken
            );

            if (charge.Status != "succeeded")
            {
                return BadRequest(new { message = "Payment failed." });
            }
        }

        // Create the order
        var order = new OrderModel
        {
            Id = Guid.NewGuid(),
            OrderedByDonorId = donorId,
            OrderDate = DateTime.UtcNow,
            TotalAmount = totalAmount,
            OrderItems = cart.CartItems.Select(ci => new OrderItemModel
            {
                Id = Guid.NewGuid(),
                MedicineId = ci.MedicineId,
                Quantity = ci.Quantity,
                DeliveryPartnerId = ci.DeliveryPartnerId ?? Guid.Empty,
            }).ToList()
        };

        _dbContext.Orders.Add(order);

        // Clear the cart
        _dbContext.CartItems.RemoveRange(cart.CartItems);
        _dbContext.Carts.Remove(cart);

        _dbContext.SaveChanges();

        return Ok(new { message = "Order placed successfully!", orderId = order.Id });
    }
}