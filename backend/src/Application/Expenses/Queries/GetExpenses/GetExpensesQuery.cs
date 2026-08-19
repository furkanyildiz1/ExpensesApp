using MediatR;
using System.Collections.Generic;
using Application.DTOs;


namespace Application.Expenses.Queries.GetExpenses;

// Bu sorgu, MediatR aracılığıyla gönderildiğinde bize geriye IEnumerable<ExpenseDto> listesi dönecek.
public record GetExpensesQuery : IRequest<IEnumerable<ExpenseDto>>;
