using System;

namespace backend.Models;

public class RecieverModel
{
    public Guid Id { get; set; }
    public required string FullName { get; set; } // For both individual and organization
    public required string ReceiverType { get; set; } // "Individual" or "Organization"
    public string? OrganizationType { get; set; } // Nullable for individual receivers types are NGOs or INGOs
    public required string Email { get; set; } // For both individual and organization Email field
    public required string Password { get; set; } // For both individual and organization Password field
    public string? DocumentPath { get; set; } // Path to uploaded document for organizations
}
