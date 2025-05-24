using backend.Data;
using backend.DTOs.Request;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly JwtServices _jwtService;

    public AdminController(AppDbContext dbContext, JwtServices jwtService)
    {
        _dbContext = dbContext;
        _jwtService = jwtService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest adminDto)
    {
        // Retrieve admin from the database
        var admin = _dbContext.Admins.FirstOrDefault(a => a.Email == adminDto.Email);
        if (admin == null || admin.Password != adminDto.Password)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // Generate JWT token
        var token = _jwtService.GenerateToken(admin.Id, admin.Email, "Admin");

        return Ok(new { token });
    }
}
