using System;

namespace Application.DTOs;

public class ExpenseDto
{
    public int Id {get; set;}
    public string Description {get; set;}= string.Empty;
    public decimal Amount {get; set;}
    public DateTime Date {get; set;}
    public string Category {get; set;}= "Diğer";
}

