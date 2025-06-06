using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/admin-review")]
[Authorize(Roles = "Admin")] // Only accessible by admins
public class AdminReviewController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public AdminReviewController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Get all organization donors that need review
    [HttpGet("organization-donors")]
    public IActionResult GetPendingOrganizationDonors()
    {
        var pendingDonors = _dbContext.Donors
            .Where(d => d.DonorType == "Organization" && !d.IsVerified)
            .Select(d => new
            {
                d.Id,
                d.FullName,
                d.Email,
                d.OrganizationType,
                d.DocumentPath,
                d.IsVerified
            })
            .ToList();

        return Ok(pendingDonors);
    }

    // Get all delivery partners that need review
    [HttpGet("delivery-partners")]
    public IActionResult GetPendingDeliveryPartners()
    {
        var pendingDeliveryPartners = _dbContext.DeliveryPartners
            .Where(dp => !dp.IsApproved)
            .Select(dp => new
            {
                dp.Id,
                dp.FirstName,
                dp.LastName,
                dp.Email,
                dp.LicenseNumber,
                dp.PhoneNumber,
                dp.IsApproved
            })
            .ToList();

        return Ok(pendingDeliveryPartners);
    }
}
