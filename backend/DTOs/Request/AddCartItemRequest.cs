using System;

namespace backend.DTOs.Request;

public class AddCartItemRequest
{
    public Guid MedicineId { get; set; }
    public int Quantity { get; set; }
    public Guid? DeliveryPartnerId { get; set; }
}