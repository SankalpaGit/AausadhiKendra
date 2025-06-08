using backend.Data;
using backend.Models;
using backend.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace backend.Controllers;

[ApiController]
[Route("api/order")]
[Authorize(Roles = "Donor")]// Ensure only authenticated users can access this API
public class OrderController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public OrderController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // API to order medicine
    [HttpPost("donation")]
    // Ensure only donors can access this endpoint
    public IActionResult OrderMedicine(Guid medicineId, Guid deliveryPartnerId)
    {
        // Get the authenticated donor's ID from JWT claims
        var donorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (donorIdClaim == null || !Guid.TryParse(donorIdClaim, out var donorId))
        {
            return Unauthorized(new { message = "Invalid or missing donor ID in token." });
        }

        // Fetch the medicine from the database
        var medicine = _dbContext.Medicines.FirstOrDefault(m => m.MedicineId == medicineId);
        if (medicine == null)
        {
            return NotFound(new { message = "Medicine not found." });
        }

        // Ensure the medicine is not added by the same donor
        if (medicine.DonorId == donorId)
        {
            return BadRequest(new { message = "You cannot order your own medicine." });
        }

        // Ensure the medicine status is "Donation"
        if (medicine.Status != MedicineStatus.Donation)
        {
            return BadRequest(new { message = "Only medicines with 'Donation' status can be ordered." });
        }

        // Fetch the delivery partner from the database
        var deliveryPartner = _dbContext.DeliveryPartners.FirstOrDefault(dp => dp.Id == deliveryPartnerId && dp.IsApproved);
        if (deliveryPartner == null)
        {
            return NotFound(new { message = "Delivery partner not found or not approved." });
        }

        // Fetch the donor from the database
        var donor = _dbContext.Donors.FirstOrDefault(d => d.Id == donorId);
        if (donor == null)
        {
            return NotFound(new { message = "Donor not found." });
        }

        // Create the order
        var order = new OrderModel
        {
            Id = Guid.NewGuid(),
            MedicineId = medicine.MedicineId,
            OrderedByDonorId = donorId,
            DeliveryPartnerId = deliveryPartner.Id,
            OrderDate = DateTime.UtcNow,
            OrderedByDonor = donor,
            DeliveryPartner = deliveryPartner,
            Medicine = medicine // Set the required Medicine property
        };

        // Save the order to the database
        _dbContext.Orders.Add(order);
        _dbContext.SaveChanges();

        return Ok(new { message = "Medicine ordered successfully!", orderId = order.Id });
    }
}
