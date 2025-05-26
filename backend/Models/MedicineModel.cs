using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models;

public class MedicineModel
{
    [Key]
    public Guid MedicineId { get; set; } // Unique identifier for the medicine

    [Required]
    public required string Name { get; set; } // Name of the medicine

    [Required]
    public decimal UnitPrice { get; set; } // Unit price of the medicine

    [Required]
    public DateTime ExpiryDate { get; set; } // Expiry date of the medicine

    [Required]
    public int Quantity { get; set; } // Quantity of the medicine

    public MedicineStatus Status { get; set; } // use medicine status enum 

    // Foreign key to DonorModel
    [Required]
    public Guid DonorId { get; set; }

    [ForeignKey("DonorId")]
    public DonorModel ? Donor { get; set; } // Navigation property for the donor
}
