using backend.Data;
using backend.DTOs.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisplayController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public DisplayController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("donor-medicines")]
        [Authorize(Roles = "Donor")]
        public IActionResult GetDonorMedicines(int page = 1, int pageSize = 10)
        {
            // Extract donor ID from JWT claims
            var donorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (donorIdClaim == null || !Guid.TryParse(donorIdClaim, out var donorId))
            {
                return Unauthorized(new { message = "Invalid or missing donor ID in token." });
            }

            // Query medicines added by the donor
            var query = _dbContext.Medicines.Where(m => m.DonorId == donorId);

            // Pagination logic
            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var medicines = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new
                {
                    m.MedicineId,
                    m.Name,
                    m.UnitPrice,
                    m.ExpiryDate,
                    m.Quantity,
                    m.Status
                })
                .ToList();

            // Return paginated response
            return Ok(new
            {
                CurrentPage = page,
                TotalPages = totalPages,
                PageSize = pageSize,
                TotalCount = totalCount,
                Medicines = medicines
            });
        }

        [HttpGet("view")]
        [Authorize(Roles = "Donor")]
        public IActionResult ViewMedicines(int page = 1, int pageSize = 10)
        {
            var query = _dbContext.Medicines.AsQueryable();

            // Pagination logic
            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var medicines = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new
                {
                    m.MedicineId,
                    m.Name,
                    m.UnitPrice,
                    m.ExpiryDate,
                    m.Quantity,
                    m.Status,
                    DonorName = m.Donor.FullName // Include donor name for reference
                })
                .ToList();

            var response = new PaginatedResponse<object>
            {
                CurrentPage = page,
                TotalPages = totalPages,
                PageSize = pageSize,
                TotalCount = totalCount,
                Data = medicines.Cast<object>().ToList()
            };

            return Ok(response);
        }
    }
}
