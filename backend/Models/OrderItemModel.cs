using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class OrderItemModel
{
    [Key]
    public Guid Id { get; set; } // Unique identifier for the order item

    [Required]
    public Guid MedicineId { get; set; } // ID of the medicine

    [ForeignKey("MedicineId")]
    public MedicineModel? Medicine { get; set; } // Navigation property for the medicine

    [Required]
    public int Quantity { get; set; } // Quantity of the medicine ordered

    [Required]
    public Guid DeliveryPartnerId { get; set; } // ID of the assigned delivery partner

    [ForeignKey("DeliveryPartnerId")]
    public DeliveryPartnerModel? DeliveryPartner { get; set; } // Navigation property for the delivery partner

    [Required]
    public Guid OrderId { get; set; } // ID of the parent order

    [ForeignKey("OrderId")]
    public OrderModel ? Order { get; set; } // Navigation property for the parent order
}
