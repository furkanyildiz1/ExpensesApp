using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.DTOs;
using MediatR;

namespace Application.Expenses.Queries.GetExpenses;

public class GetExpensesQueryHandler : IRequestHandler<GetExpensesQuery, IEnumerable<ExpenseDto>>
{
    private readonly IExpenseRepository _repository;

    public GetExpensesQueryHandler(IExpenseRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ExpenseDto>>Handle(GetExpensesQuery request, CancellationToken cancellationToken)
    {
        var expenses = await _repository.GetAllAsync(cancellationToken);

        //veri tabanı entity modellerini dto nesnelerine aktardık
        return expenses.Select(e => new ExpenseDto
        {
            Id = e.Id,
            Description = e.Description,
            Amount = e.Amount,
            Date = e.Date,
            Category = e.Category
        });
    }
}