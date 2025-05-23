using System;

namespace backend.Models;

public class AdminModel
{
    public Guid Id { get; set; }
    public required string AdminName { get; set; } // For both individual and organization
    public required string Email { get; set; } // For both individual and organization Email field
    public required string Password { get; set; } // For both individual and organization Password field

}
