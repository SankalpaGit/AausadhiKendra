using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace backend.Controllers;

[ApiController]
[Route("api/receiver")]
public class ReceiverController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly IWebHostEnvironment _env;
    private readonly HashedPassword _passwordService;
    private readonly JwtServices _jwtService;

    public ReceiverController(AppDbContext dbContext, IWebHostEnvironment env, HashedPassword passwordService, JwtServices jwtService)
    {
        _dbContext = dbContext;
        _env = env;
        _passwordService = passwordService;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public IActionResult Register([FromForm] RecieverModel receiver, IFormFile? document)
    {
        if (receiver.ReceiverType == "Organization")
        {
            if (document == null)
            {
                return BadRequest(new { message = "Document is required for organization receivers." });
            }

            string uploadsDir = Path.Combine(_env.WebRootPath, "Uploads");
            if (!Directory.Exists(uploadsDir))
            {
                Directory.CreateDirectory(uploadsDir);
            }

            string filePath = Path.Combine(uploadsDir, document.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                document.CopyTo(stream);
            }

            receiver.DocumentPath = filePath;
        }

        // Hash the password before saving
        receiver.Password = _passwordService.HashPassword(receiver.Password);

        // Save receiver to database
        _dbContext.Receivers.Add(receiver);
        _dbContext.SaveChanges();

        return Ok(new { message = "Receiver registered successfully!" });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] RecieverModel receiver)
    {
        var existingReceiver = _dbContext.Receivers.FirstOrDefault(r => r.Email == receiver.Email);
        if (existingReceiver == null || !_passwordService.VerifyPassword(receiver.Password, existingReceiver.Password))
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // Generate JWT token
        var token = _jwtService.GenerateToken(existingReceiver.Id, existingReceiver.Email, existingReceiver.ReceiverType);

        return Ok(new { token });
    }

    [HttpPut("verify/{id}")]
    public IActionResult VerifyReceiver(Guid id, [FromBody] bool isVerified)
    {
        var receiver = _dbContext.Receivers.FirstOrDefault(r => r.Id == id && r.ReceiverType == "Organization");
        if (receiver == null)
        {
            return NotFound(new { message = "Organization receiver not found." });
        }

        receiver.IsVerified = isVerified;
        _dbContext.SaveChanges();

        return Ok(new { message = isVerified ? "Receiver verified successfully!" : "Receiver rejected successfully!" });
    }
}