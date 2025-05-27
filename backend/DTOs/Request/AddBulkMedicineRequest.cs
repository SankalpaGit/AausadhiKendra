using System;
using System.Collections.Generic;

namespace backend.DTOs.Request;

public class AddBulkMedicineRequest
{
    public List<AddMedicineRequest> Medicines { get; set; } = new();
}
