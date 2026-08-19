using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Expenses.Commands.DeleteExpense;

public class DeleteExpenseCommandHandler : IRequestHandler<DeleteExpenseCommand, bool>
{
    private readonly IExpenseRepository _repository;

    public DeleteExpenseCommandHandler(IExpenseRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> Handle(DeleteExpenseCommand request, CancellationToken cancellationToken)
    {
        //silinecekl kaydı bulacaz
        var expense = await _repository.GetByIdAsync(request.Id, cancellationToken);

        if(expense == null)
        {
            return false;
        }

        //kaydı varsa silciez

        await _repository.DeleteAsync(expense, cancellationToken);

        //silme başarılı

        return true;
    }
}