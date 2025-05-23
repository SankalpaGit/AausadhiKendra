using System;

namespace backend.Models;

public class DonorModel
{
    public Guid Id { get; set; }
    public required string FullName { get; set; } // For both individual and organization
    public required string DonorType { get; set; } // "Individual" or "Organization"
    public string? OrganizationType { get; set; } // Nullable for individual donors types are Hospital or Pharmacy 
    public required string Email { get; set; } // For both individual and organization Email field
    public required string Password { get; set; } // For both individual and organization Password field

    public string? DocumentPath { get; set; } // Path to uploaded document for organizations

    public bool IsVerified { get; set; } // Indicates if the donor is verified only for organizations
}
