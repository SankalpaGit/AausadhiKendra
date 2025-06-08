using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class OrderModel
{
    [Key]
    public Guid Id { get; set; } // Unique identifier for the order

    [Required]
    public Guid MedicineId { get; set; } // ID of the ordered medicine

    [ForeignKey("MedicineId")]
    public required MedicineModel Medicine { get; set; } // Navigation property for the medicine

    [Required]
    public Guid OrderedByDonorId { get; set; } // ID of the donor who placed the order

    [ForeignKey("OrderedByDonorId")]
    public required DonorModel OrderedByDonor { get; set; } // Navigation property for the donor

    [Required]
    public Guid DeliveryPartnerId { get; set; } // ID of the assigned delivery partner

    [ForeignKey("DeliveryPartnerId")]
    public required DeliveryPartnerModel DeliveryPartner { get; set; } // Navigation property for the delivery partner

    [Required]
    public DateTime OrderDate { get; set; } // Date when the order was placed
}
