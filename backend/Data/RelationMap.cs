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

        // Define the relationship between OrderModel and MedicineModel
        modelBuilder.Entity<OrderModel>()
            .HasOne(o => o.Medicine) // An order is for one medicine
            .WithMany() // A medicine can be part of many orders
            .HasForeignKey(o => o.MedicineId) // Foreign key in OrderModel
            .OnDelete(DeleteBehavior.Restrict); // Restrict delete to prevent accidental deletion of medicines

        // Define the relationship between OrderModel and DonorModel
        modelBuilder.Entity<OrderModel>()
            .HasOne(o => o.OrderedByDonor) // An order is placed by one donor
            .WithMany() // A donor can place many orders
            .HasForeignKey(o => o.OrderedByDonorId) // Foreign key in OrderModel
            .OnDelete(DeleteBehavior.Restrict); // Restrict delete to prevent accidental deletion of donors

        // Define the relationship between OrderModel and DeliveryPartnerModel
        modelBuilder.Entity<OrderModel>()
            .HasOne(o => o.DeliveryPartner) // An order is assigned to one delivery partner
            .WithMany() // A delivery partner can handle many orders
            .HasForeignKey(o => o.DeliveryPartnerId) // Foreign key in OrderModel
            .OnDelete(DeleteBehavior.Restrict); // Restrict delete to prevent accidental deletion of delivery partners
    }
}
