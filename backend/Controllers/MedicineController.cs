using backend.Data;
using backend.DTOs.Request;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/medicine")]
public class MedicineController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly MedicineStatusService _statusService;

    public MedicineController(AppDbContext dbContext, MedicineStatusService statusService)
    {
        _dbContext = dbContext;
        _statusService = statusService;
    }

    [HttpPost("add")]
    [Authorize(Roles = "Donor")]
    public IActionResult AddMedicine([FromBody] AddMedicineRequest request)
    {
        // Extract donor ID from JWT claims
        var donorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (donorIdClaim == null || !Guid.TryParse(donorIdClaim, out var donorId))
        {
            return Unauthorized(new { message = "Invalid or missing donor ID in token." });
        }

        // Validate donor existence
        var donor = _dbContext.Donors.FirstOrDefault(d => d.Id == donorId);
        if (donor == null)
        {
            return NotFound(new { message = "Donor not found." });
        }

        // Create and determine status
        var medicine = new MedicineModel
        {
            MedicineId = Guid.NewGuid(),
            Name = request.Name,
            UnitPrice = request.UnitPrice,
            ExpiryDate = request.ExpiryDate,
            Quantity = request.Quantity,
            DonorId = donorId,
            Status = _statusService.DetermineStatus(new MedicineModel
            {
                Name = request.Name,
                UnitPrice = request.UnitPrice,
                ExpiryDate = request.ExpiryDate,
                Quantity = request.Quantity
            })
        };

        // Save to database
        _dbContext.Medicines.Add(medicine);
        _dbContext.SaveChanges();

        return Ok(new { message = "Medicine added successfully!", MedicineId = medicine.MedicineId });
    }

    [HttpPost("add-bulk")]
    [Authorize(Roles = "Donor")]
    public IActionResult AddBulkMedicines([FromBody] AddBulkMedicineRequest request)
    {
        // Extract donor ID from JWT claims
        var donorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (donorIdClaim == null || !Guid.TryParse(donorIdClaim, out var donorId))
        {
            return Unauthorized(new { message = "Invalid or missing donor ID in token." });
        }

        // Validate donor existence
        var donor = _dbContext.Donors.FirstOrDefault(d => d.Id == donorId);
        if (donor == null)
        {
            return NotFound(new { message = "Donor not found." });
        }

        var medicines = new List<MedicineModel>();

        foreach (var medicineRequest in request.Medicines)
        {
            // Create and determine status
            var medicine = new MedicineModel
            {
                MedicineId = Guid.NewGuid(),
                Name = medicineRequest.Name,
                UnitPrice = medicineRequest.UnitPrice,
                ExpiryDate = medicineRequest.ExpiryDate,
                Quantity = medicineRequest.Quantity,
                DonorId = donorId,
                Status = _statusService.DetermineStatus(new MedicineModel
                {
                    Name = medicineRequest.Name,
                    UnitPrice = medicineRequest.UnitPrice,
                    ExpiryDate = medicineRequest.ExpiryDate,
                    Quantity = medicineRequest.Quantity
                })
            };

            medicines.Add(medicine);
        }

        // Save all medicines to database
        _dbContext.Medicines.AddRange(medicines);
        _dbContext.SaveChanges();

        return Ok(new { message = "Medicines added successfully!", MedicineCount = medicines.Count });
    }
}