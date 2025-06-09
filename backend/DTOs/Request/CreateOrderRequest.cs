using System;
using System.Collections.Generic;

namespace backend.DTOs.Request;

public class CreateOrderRequest
{
    public List<OrderItemRequest> OrderItems { get; set; } = new List<OrderItemRequest>(); // List of medicines in the order
    public required string StripeToken { get; set; } // Stripe payment token
}

public class OrderItemRequest
{
    public Guid MedicineId { get; set; } // ID of the medicine
    public int Quantity { get; set; } // Quantity of the medicine
    public Guid DeliveryPartnerId { get; set; } // ID of the assigned delivery partner
}
