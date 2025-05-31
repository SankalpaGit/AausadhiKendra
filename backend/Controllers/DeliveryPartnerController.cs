using backend.Data;
using backend.DTOs.Request;
using backend.Models;
using backend.Services;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/delivery-partner")]
public class DeliveryPartnerController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly HashedPassword _passwordService;
    private readonly JwtServices _jwtService;
    private readonly EmailService _emailService;

    public DeliveryPartnerController(AppDbContext dbContext, HashedPassword passwordService, JwtServices jwtService, EmailService emailService)
    {
        _dbContext = dbContext;
        _passwordService = passwordService;
        _jwtService = jwtService;
        _emailService = emailService;
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

    [HttpPut("approve/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult ApproveDeliveryPartner(Guid id)
    {
        var deliveryPartner = _dbContext.DeliveryPartners.FirstOrDefault(dp => dp.Id == id);
        if (deliveryPartner == null)
        {
            return NotFound(new { message = "Delivery partner not found." });
        }

        deliveryPartner.IsApproved = true;
        _dbContext.SaveChanges();

        // Send approval email
        var subject = "Registration Approved";
        var body = $@"
            <h1>Congratulations, {deliveryPartner.FirstName}!</h1>
            <p>Your registration as a delivery partner has been approved.</p>
            <p>You can now log in to your account using the following link:</p>
            <a href='http://localhost:3000/login' style='padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;'>Login</a>
        ";
        _emailService.SendEmail(deliveryPartner.Email, subject, body);

        return Ok(new { message = "Delivery partner approved successfully!" });
    }

    [HttpPut("reject/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult RejectDeliveryPartner(Guid id)
    {
        var deliveryPartner = _dbContext.DeliveryPartners.FirstOrDefault(dp => dp.Id == id);
        if (deliveryPartner == null)
        {
            return NotFound(new { message = "Delivery partner not found." });
        }

        // Remove the delivery partner from the database
        _dbContext.DeliveryPartners.Remove(deliveryPartner);
        _dbContext.SaveChanges();

        // Send rejection email
        var subject = "Registration Rejected";
        var body = $@"
            <h1>Dear {deliveryPartner.FirstName},</h1>
            <p>We regret to inform you that your registration as a delivery partner has been rejected.</p>
            <p>If you have any questions, please contact our support team.</p>
        ";
        _emailService.SendEmail(deliveryPartner.Email, subject, body);

        return Ok(new { message = "Delivery partner rejected successfully!" });
    }

    [HttpPost("login")]
    public IActionResult DeliveryPartnerLogin([FromBody] LoginRequest request)
    {
        var deliveryPartner = _dbContext.DeliveryPartners.FirstOrDefault(dp => dp.Email == request.Email);
        if (deliveryPartner == null || deliveryPartner.IsApproved == false)
        {
            return Unauthorized(new { message = "Your account is not approved yet or invalid credentials." });
        }

        if (!_passwordService.VerifyPassword(request.Password, deliveryPartner.Password))
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // Generate JWT token (use JwtServices)
        var token = _jwtService.GenerateToken(deliveryPartner.Id, deliveryPartner.Email, "DeliveryPartner");

        return Ok(new { token });
    }
}
