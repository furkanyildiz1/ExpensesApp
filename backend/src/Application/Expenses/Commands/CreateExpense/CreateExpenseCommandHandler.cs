using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.DTOs;
using Core.Entities;
using MediatR;

namespace Application.Expenses.Commands.CreateExpense;

public class CreateExpenseCommandHandler: IRequestHandler<CreateExpenseCommand, ExpenseDto>
{
    private readonly IExpenseRepository _repository;

    public CreateExpenseCommandHandler(IExpenseRepository repository)
    {
        _repository = repository;
    }

    public async Task<ExpenseDto> Handle(CreateExpenseCommand request, CancellationToken cancellationToken)
    {
        //gelen komut verileriyle yeni bir expnese entitiysi oluşturduk
        var expense = new Expense
        {
            Description = request.Description,
            Amount = request.Amount,
            Date = request.Date,
            Category = request.Category

        };

        //repository aracılığıyla veri tabanına kayudetcez

        var createdExpense = await _repository.AddAsync(expense, cancellationToken);

        //oluşturulan nesneyi dto formatında geri gönderelim

        return new ExpenseDto
        {
            Id = createdExpense.Id,
            Description = createdExpense.Description,
            Amount = createdExpense.Amount,
            Date = createdExpense.Date,
            Category = createdExpense.Category
        };

    }
}