using backend.Data;
using backend.DTOs.Request;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/delivery-partner")]
public class DeliveryPartnerController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly JwtServices _jwtService;

    private readonly HashedPassword _passwordService;

    public DeliveryPartnerController(AppDbContext dbContext, HashedPassword passwordService, JwtServices jwtService)
    {
        _dbContext = dbContext;
        _passwordService = passwordService;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public IActionResult RegisterDeliveryPartner([FromBody] RegisterDeliveryPartnerRequest request)
    {
        // Check if the email is already registered
        if (_dbContext.DeliveryPartners.Any(dp => dp.Email == request.Email))
        {
            return BadRequest(new { message = "Email is already registered." });
        }

        // Create a new delivery partner
        var deliveryPartner = new DeliveryPartnerModel
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Password = _passwordService.HashPassword(request.Password), // Hash the password
            Address = request.Address,
            LicenseNumber = request.LicenseNumber,
            PhoneNumber = request.PhoneNumber,
            IsApproved = false // Default to not approved
        };

        // Save to database
        _dbContext.DeliveryPartners.Add(deliveryPartner);
        _dbContext.SaveChanges();

        return Ok(new { message = "Delivery partner registered successfully! Awaiting admin approval." });
    }

    [HttpPut("approve-delivery-partner/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult ApproveDeliveryPartner(Guid id, [FromBody] bool isApproved)
    {
        var deliveryPartner = _dbContext.DeliveryPartners.FirstOrDefault(dp => dp.Id == id);
        if (deliveryPartner == null)
        {
            return NotFound(new { message = "Delivery partner not found." });
        }

        deliveryPartner.IsApproved = isApproved;
        _dbContext.SaveChanges();

        return Ok(new { message = isApproved ? "Delivery partner approved successfully!" : "Delivery partner rejected successfully!" });
    }

    [HttpPost("login")]
    public IActionResult DeliveryPartnerLogin([FromBody] LoginRequest request)
    {
        var deliveryPartner = _dbContext.DeliveryPartners.FirstOrDefault(dp => dp.Email == request.Email);
        if (deliveryPartner == null || deliveryPartner.IsApproved == false)
        {
            return Unauthorized(new { message = "Your account is not approved yet or invalid credentials." });
        }

        if (deliveryPartner.Password != request.Password) // Assuming plain-text password for simplicity
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // Generate JWT token (use JwtServices)
        var token = _jwtService.GenerateToken(deliveryPartner.Id, deliveryPartner.Email, "DeliveryPartner");

        return Ok(new { token });
    }
}
