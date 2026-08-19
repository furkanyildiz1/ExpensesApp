using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.DTOs;
using MediatR;

namespace Application.Expenses.Commands.UpdateExpense;


public class UpdateExpenseCommandHandler : IRequestHandler<UpdateExpenseCommand, ExpenseDto?>
{
    private readonly IExpenseRepository _repository;

    public UpdateExpenseCommandHandler(IExpenseRepository repository)
    {
        _repository = repository;
    }

    public async Task<ExpenseDto?> Handle(UpdateExpenseCommand request, CancellationToken cancellationToken)
    {
        //güncelicemiz veriyi bul

        var existingExpense = await _repository.GetByIdAsync(request.Id, cancellationToken);

        //eğer veri yoksa null

        if(existingExpense == null)
        {
            return null;
        }

        //var olan veriyi güncelleme

        existingExpense.Description = request.Description;
        existingExpense.Amount = request.Amount;
        existingExpense.Date = request.Date;
        existingExpense.Category = request.Category;

        //veritabanına kaytdetme

        await _repository.UpdateAsync(existingExpense, cancellationToken);

        //güncel veriyi dto olarak ver

        return new ExpenseDto{
            Id = existingExpense.Id,
            Description = existingExpense.Description,
            Amount = existingExpense.Amount,
            Date = existingExpense.Date,
            Category = existingExpense.Category
        };
    }
}