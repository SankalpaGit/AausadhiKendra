using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class DeliveryPartnerModel
{
    [Key]
    public Guid Id { get; set; } // Unique identifier for the delivery partner

    [Required]
    public required string FirstName { get; set; } // First name of the delivery partner

    [Required]
    public required string LastName { get; set; } // Last name of the delivery partner

    [Required]
    [EmailAddress]
    public required string Email { get; set; } // Email of the delivery partner

    [Required]
    public required string Password { get; set; } // Password for the delivery partner (hashed)

    [Required]
    public required string Address { get; set; } // Address of the delivery partner

    [Required]
    public required string LicenseNumber { get; set; } // License number of the delivery partner

   [Required]
    public required string VehicleType { get; set; } // Type of vehicle used by the delivery partner

    [Required]
    public  required string  VehicleNumber { get; set; } // Vehicle number of the delivery partner

    [Required]
    public required string PhoneNumber { get; set; } // Phone number of the delivery partner

    public bool IsApproved { get; set; } = false; // Indicates if the registration is approved by the admin
}
