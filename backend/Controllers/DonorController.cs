using backend.Data;
using backend.Models;
using backend.Services;
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
    public IActionResult Register([FromForm] DonorModel donor, IFormFile? document)
    {
        if (donor.DonorType == "Organization")
        {
            if (document == null)
            {
                return BadRequest(new { message = "Document is required for organization donors." });
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

            donor.DocumentPath = filePath;
        }

        // Hash the password before saving
        donor.Password = _passwordService.HashPassword(donor.Password);

        // Save donor to database
        _dbContext.Donors.Add(donor);
        _dbContext.SaveChanges();

        return Ok(new { message = "Donor registered successfully!" });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] DonorModel donor)
    {
        var existingDonor = _dbContext.Donors.FirstOrDefault(d => d.Email == donor.Email);
        if (existingDonor == null || !_passwordService.VerifyPassword(donor.Password, existingDonor.Password))
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // Generate JWT token
        var token = _jwtService.GenerateToken(existingDonor.Id, existingDonor.Email, existingDonor.DonorType);

        return Ok(new { token });
    }

    [HttpPut("verify/{id}")]
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
