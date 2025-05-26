using System;
using backend.Models;
using backend.Models.Enums;

namespace backend.Services;

public class MedicineStatusService
{
    private readonly List<Func<MedicineModel, MedicineStatus?>> _rules;

    public MedicineStatusService()
    {
        // Initialize rules in priority order
        _rules = new List<Func<MedicineModel, MedicineStatus?>>
        {
            // Rule 1: Expiring within 30 days
            medicine => medicine.ExpiryDate <= DateTime.Now.AddDays(30) ? MedicineStatus.Donation : null,

            // Rule 2: Expensive and low stock
            medicine => medicine.UnitPrice > 200 && medicine.Quantity < 10 ? MedicineStatus.Donation : null,

            // Rule 3: Expensive and high stock
            medicine => medicine.UnitPrice > 200 && medicine.Quantity > 10 ? MedicineStatus.Sales : null,

            // Rule 4: Cheap, low stock, and expiring soon
            medicine => medicine.UnitPrice < 200 && medicine.Quantity < 20 && medicine.ExpiryDate <= DateTime.Now.AddDays(30) ? MedicineStatus.Donation : null,

            // Rule 5: Cheap, high stock, and not expiring soon
            medicine => medicine.UnitPrice < 200 && medicine.Quantity > 20 && medicine.ExpiryDate > DateTime.Now.AddDays(30) ? MedicineStatus.Sales : null
        };
    }

    public MedicineStatus DetermineStatus(MedicineModel medicine)
    {
        // Evaluate rules in order of priority
        foreach (var rule in _rules)
        {
            var result = rule(medicine);
            if (result.HasValue)
            {
                return result.Value;
            }
        }

        // Default condition
        return MedicineStatus.Donation;
    }
}
