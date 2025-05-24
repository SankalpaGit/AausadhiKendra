using System;

namespace backend.DTOs.Request;

public class RegisterRequest
{
     public required string FullName { get; set; }
    public required string DonorType { get; set; } // Individual or Organization
    public string? OrganizationType { get; set; } // Nullable for individual receivers
    public required string Email { get; set; }
    public required string Password { get; set; }
    public IFormFile? Document { get; set; } 
}
