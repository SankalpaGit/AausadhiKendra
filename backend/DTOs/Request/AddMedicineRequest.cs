using System;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Request;

public class AddMedicineRequest
{
    [Required]
    public required string Name { get; set; } // Name of the medicine

    [Required]
    public decimal UnitPrice { get; set; } // Unit price of the medicine

    [Required]
    public DateTime ExpiryDate { get; set; } // Expiry date of the medicine

    [Required]
    public int Quantity { get; set; } // Quantity of the medicine

    [Required]
    public Guid DonorId { get; set; } // Donor ID
}
