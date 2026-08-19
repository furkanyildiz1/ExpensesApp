using System;
using Application.DTOs;
using MediatR;

namespace Application.Expenses.Commands.CreateExpense;

public record CreateExpenseCommand(
    string Description,
    decimal Amount,
    DateTime Date,
    string Category
) : IRequest<ExpenseDto>;