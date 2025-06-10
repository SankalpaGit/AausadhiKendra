using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class CartModel
{
    [Key]
    public Guid Id { get; set; } // Unique identifier for the cart

    [Required]
    public Guid DonorId { get; set; } // ID of the donor who owns the cart

    [ForeignKey("DonorId")]
    public DonorModel Donor { get; set; } // Navigation property for the donor

    public ICollection<CartItemModel> CartItems { get; set; } // Collection of cart items
}
