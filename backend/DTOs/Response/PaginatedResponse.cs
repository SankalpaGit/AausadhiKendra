using System;
using System.Collections.Generic;

namespace backend.DTOs.Response;

public class PaginatedResponse<T>
{
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public List<T> Data { get; set; } = new();
}
