using System;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class RelationMap
{
    public static void ConfigureRelations(ModelBuilder modelBuilder)
    {
        // Define the relationship between MedicineModel and DonorModel
        modelBuilder.Entity<MedicineModel>()
            .HasOne(m => m.Donor) // A medicine belongs to one donor
            .WithMany() // A donor can have many medicines
            .HasForeignKey(m => m.DonorId) // Foreign key in MedicineModel
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete when a donor is deleted

        // Define the relationship between CartModel and DonorModel
        modelBuilder.Entity<CartModel>()
            .HasOne(c => c.Donor)
            .WithMany()
            .HasForeignKey(c => c.DonorId)
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete when a donor is deleted

        // Define the relationship between CartModel and CartItemModel
        modelBuilder.Entity<CartModel>()
            .HasMany(c => c.CartItems)
            .WithOne(ci => ci.Cart)
            .HasForeignKey(ci => ci.CartId)
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete when a cart is deleted

        // Define the relationship between CartItemModel and MedicineModel
        modelBuilder.Entity<CartItemModel>()
            .HasOne(ci => ci.Medicine)
            .WithMany()
            .HasForeignKey(ci => ci.MedicineId)
            .OnDelete(DeleteBehavior.Restrict); // Restrict delete to prevent accidental deletion of medicines

        // Define the relationship between CartItemModel and DeliveryPartnerModel
        modelBuilder.Entity<CartItemModel>()
            .HasOne(ci => ci.DeliveryPartner)
            .WithMany()
            .HasForeignKey(ci => ci.DeliveryPartnerId)
            .OnDelete(DeleteBehavior.Restrict); // Restrict delete to prevent accidental deletion of delivery partners
    }
}
