using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public InventoryController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Update a medicine
        [HttpPut("update/{id}")]
        [Authorize(Roles = "Donor")]
        public IActionResult UpdateMedicine(Guid id, [FromBody] MedicineModel updatedMedicine)
        {
            // Extract donor ID from JWT claims
            var donorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (donorIdClaim == null || !Guid.TryParse(donorIdClaim, out var donorId))
            {
                return Unauthorized(new { message = "Invalid or missing donor ID in token." });
            }

            // Find the medicine by ID and ensure it belongs to the donor
            var medicine = _dbContext.Medicines.FirstOrDefault(m => m.MedicineId == id && m.DonorId == donorId);
            if (medicine == null)
            {
                return NotFound(new { message = "Medicine not found or does not belong to you." });
            }

            // Update the medicine fields
            medicine.Name = updatedMedicine.Name;
            medicine.UnitPrice = updatedMedicine.UnitPrice;
            medicine.ExpiryDate = updatedMedicine.ExpiryDate;
            medicine.Quantity = updatedMedicine.Quantity;
            medicine.Status = updatedMedicine.Status;

            // Save changes to the database
            _dbContext.SaveChanges();

            return Ok(new { message = "Medicine updated successfully!" });
        }

        // Delete a medicine
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Donor")]
        public IActionResult DeleteMedicine(Guid id)
        {
            // Extract donor ID from JWT claims
            var donorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (donorIdClaim == null || !Guid.TryParse(donorIdClaim, out var donorId))
            {
                return Unauthorized(new { message = "Invalid or missing donor ID in token." });
            }

            // Find the medicine by ID and ensure it belongs to the donor
            var medicine = _dbContext.Medicines.FirstOrDefault(m => m.MedicineId == id && m.DonorId == donorId);
            if (medicine == null)
            {
                return NotFound(new { message = "Medicine not found or does not belong to you." });
            }

            // Remove the medicine from the database
            _dbContext.Medicines.Remove(medicine);
            _dbContext.SaveChanges();

            return Ok(new { message = "Medicine deleted successfully!" });
        }
    }
}
