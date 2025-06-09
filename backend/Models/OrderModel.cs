using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class OrderModel
{
    [Key]
    public Guid Id { get; set; } // Unique identifier for the order

    [Required]
    public Guid OrderedByDonorId { get; set; } // ID of the donor who placed the order

    [ForeignKey("OrderedByDonorId")]
    public DonorModel OrderedByDonor { get; set; } // Navigation property for the donor

    [Required]
    public DateTime OrderDate { get; set; } // Date when the order was placed

    public ICollection<OrderItemModel> OrderItems { get; set; } // Collection of order items

    public decimal TotalAmount { get; set; } // Total amount for sales medicines
}
