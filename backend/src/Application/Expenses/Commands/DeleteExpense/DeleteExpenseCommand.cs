using MediatR;

namespace Application.Expenses.Commands.DeleteExpense;

public record DeleteExpenseCommand(int Id) : IRequest<bool>;