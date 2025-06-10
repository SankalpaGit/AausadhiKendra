using backend.Data;
using backend.Models;
using backend.DTOs.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/cart")]
[Authorize]
public class CartController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public CartController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Add item to cart
    [HttpPost("add-item")]
    public IActionResult AddItemToCart([FromBody] AddCartItemRequest request)
    {
        // Get the authenticated donor's ID from JWT claims
        var donorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (donorIdClaim == null || !Guid.TryParse(donorIdClaim, out var donorId))
        {
            return Unauthorized(new { message = "Invalid or missing donor ID in token." });
        }

        // Get or create the donor's cart
        var cart = _dbContext.Carts.FirstOrDefault(c => c.DonorId == donorId);
        if (cart == null)
        {
            cart = new CartModel
            {
                Id = Guid.NewGuid(),
                DonorId = donorId,
                CartItems = new List<CartItemModel>()
            };
            _dbContext.Carts.Add(cart);
        }

        // Add the item to the cart
        var cartItem = new CartItemModel
        {
            Id = Guid.NewGuid(),
            CartId = cart.Id,
            MedicineId = request.MedicineId,
            Quantity = request.Quantity,
            DeliveryPartnerId = request.DeliveryPartnerId
        };
        cart.CartItems.Add(cartItem);

        _dbContext.SaveChanges();

        return Ok(new { message = "Item added to cart successfully!" });
    }

    // View cart
    [HttpGet]
    public IActionResult ViewCart()
    {
        // Get the authenticated donor's ID from JWT claims
        var donorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (donorIdClaim == null || !Guid.TryParse(donorIdClaim, out var donorId))
        {
            return Unauthorized(new { message = "Invalid or missing donor ID in token." });
        }

        // Get the donor's cart
        var cart = _dbContext.Carts
            .Where(c => c.DonorId == donorId)
            .Select(c => new
            {
                c.Id,
                Items = c.CartItems.Select(ci => new
                {
                    ci.Id,
                    ci.MedicineId,
                    ci.Medicine.Name,
                    ci.Quantity,
                    ci.DeliveryPartnerId,
                    DeliveryPartnerName = ci.DeliveryPartner != null ? ci.DeliveryPartner.FirstName + " " + ci.DeliveryPartner.LastName : null
                })
            })
            .FirstOrDefault();

        if (cart == null)
        {
            return Ok(new { message = "Cart is empty." });
        }

        return Ok(cart);
    }

    // Clear cart
    [HttpDelete("clear")]
    public IActionResult ClearCart()
    {
        // Get the authenticated donor's ID from JWT claims
        var donorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (donorIdClaim == null || !Guid.TryParse(donorIdClaim, out var donorId))
        {
            return Unauthorized(new { message = "Invalid or missing donor ID in token." });
        }

        // Get the donor's cart
        var cart = _dbContext.Carts.FirstOrDefault(c => c.DonorId == donorId);
        if (cart == null)
        {
            return BadRequest(new { message = "Cart is already empty." });
        }

        _dbContext.CartItems.RemoveRange(cart.CartItems);
        _dbContext.Carts.Remove(cart);
        _dbContext.SaveChanges();

        return Ok(new { message = "Cart cleared successfully!" });
    }
}
