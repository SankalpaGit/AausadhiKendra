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
[Route("api/donor")]
public class DonorController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly IWebHostEnvironment _env;
    private readonly HashedPassword _passwordService;
    private readonly JwtServices _jwtService;

    public DonorController(AppDbContext dbContext, IWebHostEnvironment env, HashedPassword passwordService, JwtServices jwtService)
    {
        _dbContext = dbContext;
        _env = env;
        _passwordService = passwordService;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public IActionResult Register([FromForm] RegisterRequest donorDto)
    {
        if (donorDto.DonorType == "Organization" && donorDto.Document == null)
        {
            return BadRequest(new { message = "Document is required for organization donors." });
        }

        var donor = new DonorModel
        {
            Id = Guid.NewGuid(),
            FullName = donorDto.FullName,
            DonorType = donorDto.DonorType,
            OrganizationType = donorDto.OrganizationType,
            Email = donorDto.Email,
            Password = _passwordService.HashPassword(donorDto.Password),
            IsVerified = donorDto.DonorType == "Individual" // Automatically verified for individuals
        };

        if (donorDto.DonorType == "Organization")
        {
            string uploadsDir = Path.Combine(_env.WebRootPath, "Uploads");
            if (!Directory.Exists(uploadsDir))
            {
                Directory.CreateDirectory(uploadsDir);
            }

            if (donorDto.Document == null)
            {
                return BadRequest(new { message = "Document is required for organization donors." });
            }

            string filePath = Path.Combine(uploadsDir, donorDto.Document.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                donorDto.Document.CopyTo(stream);
            }

            donor.DocumentPath = filePath;
        }

        _dbContext.Donors.Add(donor);
        _dbContext.SaveChanges();

        return Ok(new { message = "Donor registered successfully!" });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest donorDto)
    {
        var donor = _dbContext.Donors.FirstOrDefault(d => d.Email == donorDto.Email);
        if (donor == null || !_passwordService.VerifyPassword(donorDto.Password, donor.Password))
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        if (donor.DonorType == "Organization" && !donor.IsVerified)
        {
            return Unauthorized(new { message = "Your account is not verified yet." });
        }

        var token = _jwtService.GenerateToken(donor.Id, donor.Email, donor.DonorType);
        return Ok(new { token });
    }

    [HttpPut("verify/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult VerifyDonor(Guid id, [FromBody] bool isVerified)
    {
        var donor = _dbContext.Donors.FirstOrDefault(d => d.Id == id && d.DonorType == "Organization");
        if (donor == null)
        {
            return NotFound(new { message = "Organization donor not found." });
        }

        donor.IsVerified = isVerified;
        _dbContext.SaveChanges();

        return Ok(new { message = isVerified ? "Donor verified successfully!" : "Donor rejected successfully!" });
    }
}
