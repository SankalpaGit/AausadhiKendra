using backend.Models;
using Microsoft.EntityFrameworkCore;


namespace backend.Data;

public class AppDbContext : DbContext
{
    // Constructor to configure the database context with the options.
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // models import and naming starts from here
    public DbSet<DonorModel> Donors { get; set; } // DonorModel name as Donors in database
    public DbSet<RecieverModel> Receivers { get; set; } // RecieverModel name as Receivers in database
    public DbSet<AdminModel> Admins { get; set; } // AdminModel name as Admins in database
    public DbSet<MedicineModel> Medicines { get; set; } // MedicineModel name as Medicines in database

    // Model builder configuration
    // This method is called when the model for a derived context is being created.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure the relationships between models
        RelationMap.ConfigureRelations(modelBuilder);
    }

}
