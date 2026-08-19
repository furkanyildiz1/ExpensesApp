using System;
using Application.DTOs;
using MediatR;

namespace Application.Expenses.Commands.UpdateExpense;

public record UpdateExpenseCommand(
    int Id,
    string Description,
    decimal Amount,
    DateTime Date,
    string Category
) : IRequest<ExpenseDto?>;