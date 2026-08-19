using Core.Entities;
using System.Threading;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Common.Interfaces;

public interface IExpenseRepository
{
    Task<IEnumerable<Expense>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Expense?> GetByIdAsync(int id, CancellationToken cancellationToken=default);
    Task<Expense> AddAsync(Expense expense, CancellationToken cancellationToken=default);
    Task UpdateAsync(Expense expense, CancellationToken cancellationToken=default);
    Task DeleteAsync(Expense expense, CancellationToken cancellationToken=default);
}