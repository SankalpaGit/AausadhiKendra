using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Request;

public class RegisterDeliveryPartnerRequest
{
    [Required]
    public required string FirstName { get; set; }

    [Required]
    public required string LastName { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }
    
    [Required]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
    public required string Password { get; set; }

    [Required]
    public required string Address { get; set; }

    [Required]
    public required string LicenseNumber { get; set; }

    [Required]
    public required string VehicleType { get; set; }

    [Required]
    public required string VehicleNumber { get; set; }

    [Required]
    public required string PhoneNumber { get; set; }
}
