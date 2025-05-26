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
    }
}
