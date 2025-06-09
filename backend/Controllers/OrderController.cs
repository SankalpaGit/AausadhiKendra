using backend.Data;
using backend.Models;
using backend.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using backend.DTOs.Request;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/order")]
[Authorize]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public OrderController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
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

        // Validate and process the order items
        var orderItems = new List<OrderItemModel>();
        decimal totalAmount = 0;

        foreach (var item in request.OrderItems)
        {
            var medicine = _dbContext.Medicines.FirstOrDefault(m => m.MedicineId == item.MedicineId);
            if (medicine == null)
            {
                return NotFound(new { message = $"Medicine with ID {item.MedicineId} not found." });
            }

            if (medicine.DonorId == donorId)
            {
                return BadRequest(new { message = "You cannot order your own medicine." });
            }

            if (medicine.Status == MedicineStatus.Sales)
            {
                totalAmount += medicine.UnitPrice * item.Quantity; // Calculate total for sales medicines
            }

            var deliveryPartner = _dbContext.DeliveryPartners.FirstOrDefault(dp => dp.Id == item.DeliveryPartnerId && dp.IsApproved);
            if (deliveryPartner == null)
            {
                return NotFound(new { message = $"Delivery partner with ID {item.DeliveryPartnerId} not found or not approved." });
            }

            orderItems.Add(new OrderItemModel
            {
                Id = Guid.NewGuid(),
                MedicineId = item.MedicineId,
                Quantity = item.Quantity,
                DeliveryPartnerId = item.DeliveryPartnerId
            });
        }

        // Create the order
        var order = new OrderModel
        {
            Id = Guid.NewGuid(),
            OrderedByDonorId = donorId,
            OrderDate = DateTime.UtcNow,
            OrderItems = orderItems,
            TotalAmount = totalAmount
        };

        _dbContext.Orders.Add(order);
        _dbContext.SaveChanges();

        // Handle payment if totalAmount > 0
        if (totalAmount > 0)
        {
            var stripeOptions = new ChargeCreateOptions
            {
                Amount = (long)(totalAmount * 100), // Stripe expects amount in cents
                Currency = "usd",
                Description = "Medicine Order Payment",
                Source = request.StripeToken // Token from frontend
            };

            var stripeService = new ChargeService();
            var charge = stripeService.Create(stripeOptions);

            if (charge.Status != "succeeded")
            {
                return BadRequest(new { message = "Payment failed." });
            }
        }

        return Ok(new { message = "Order created successfully!", orderId = order.Id });
    }
}
