using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class CartItemModel
{
    [Key]
    public Guid Id { get; set; } // Unique identifier for the cart item

    [Required]
    public Guid CartId { get; set; } // ID of the parent cart

    [ForeignKey("CartId")]
    public CartModel Cart { get; set; } // Navigation property for the parent cart

    [Required]
    public Guid MedicineId { get; set; } // ID of the medicine

    [ForeignKey("MedicineId")]
    public MedicineModel Medicine { get; set; } // Navigation property for the medicine

    [Required]
    public int Quantity { get; set; } // Quantity of the medicine

    public Guid? DeliveryPartnerId { get; set; } // ID of the assigned delivery partner (optional)

    [ForeignKey("DeliveryPartnerId")]
    public DeliveryPartnerModel DeliveryPartner { get; set; } // Navigation property for the delivery partner
}
