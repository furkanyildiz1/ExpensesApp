using System.Collections.Generic;
using System.Threading.Tasks;
using Application.DTOs;
using Application.Expenses.Commands.CreateExpense;
using Application.Expenses.Commands.DeleteExpense;
using Application.Expenses.Commands.UpdateExpense;
using Application.Expenses.Queries.GetExpenses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ExpensesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ExpensesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]

    public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetExpenses()
    {
        //mediatr ile tüm hepsini çekicez

        var query = new GetExpensesQuery();
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpPost]

    public async Task<ActionResult<ExpenseDto>> CreateExpense([FromBody] CreateExpenseCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPut("{id}")]

    public async Task<ActionResult<ExpenseDto>> UpdateExpense(int id , [FromBody] UpdateExpenseCommand command)
    {
        if(id != command.Id)
        {
            return BadRequest("URL Id si ile bodydeki id uyuşmuyor");
        }

        var result = await _mediator.Send(command);
        if(result == null)
        {
            return NotFound("güncellenmek istenen gider bulunamadı");
        }
        return Ok(result);
    }

    [HttpDelete("{id}")]

    public async Task<ActionResult> DeleteExpense(int id)
    {
        var result = await _mediator.Send(new DeleteExpenseCommand(id));
        if(!result)
        {
            return NotFound("Silinmek istenen gider bulunamadı");
        }

        return NoContent();

    }
}