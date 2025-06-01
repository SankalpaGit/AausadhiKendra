using backend.Data;
using backend.DTOs.Request;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
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
    public async Task<IActionResult> Register([FromForm] RegisterRequest receiverDto)
    {
        if (receiverDto.DonorType == "Organization" && receiverDto.Document == null)
        {
            return BadRequest(new { message = "Document is required for organization receivers." });
        }

        var receiver = new RecieverModel
        {
            Id = Guid.NewGuid(),
            FullName = receiverDto.FullName,
            ReceiverType = receiverDto.DonorType,
            OrganizationType = receiverDto.OrganizationType,
            Email = receiverDto.Email,
            Password = _passwordService.HashPassword(receiverDto.Password),
            IsVerified = receiverDto.DonorType == "Individual" // Automatically verified for individuals
        };

        if (receiverDto.DonorType == "Organization")
        {
            // Ensure WebRootPath is not null
            if (string.IsNullOrEmpty(_env.WebRootPath))
            {
                return StatusCode(500, new { message = "Server configuration error: WebRootPath is not set." });
            }

            // Define the uploads folder path
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Generate a unique file name
            if (receiverDto.Document == null)
            {
                return BadRequest(new { message = "Document is required for organization receivers." });
            }
            var uniqueFileName = $"{Guid.NewGuid()}_{receiverDto.Document.FileName}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            // Save the file
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await receiverDto.Document.CopyToAsync(fileStream);
            }

            // Store the relative path in the database
            receiver.DocumentPath = Path.Combine("Uploads", uniqueFileName);
        }

        _dbContext.Receivers.Add(receiver);
        _dbContext.SaveChanges();

        return Ok(new { message = "Receiver registered successfully!" });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest receiverDto)
    {
        var receiver = _dbContext.Receivers.FirstOrDefault(r => r.Email == receiverDto.Email);
        if (receiver == null || !_passwordService.VerifyPassword(receiverDto.Password, receiver.Password))
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        if (receiver.ReceiverType == "Organization" && !receiver.IsVerified)
        {
            return Unauthorized(new { message = "Your account is not verified yet." });
        }

        var token = _jwtService.GenerateToken(receiver.Id, receiver.Email, receiver.ReceiverType);
        return Ok(new { token });
    }

    [HttpPut("verify/{id}")]
    [Authorize(Roles = "Admin")]
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