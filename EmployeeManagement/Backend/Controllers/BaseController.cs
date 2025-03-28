using EmployeeManagement.Backend.Models;
using EmployeeManagement.Backend.Repositories;

namespace EmployeeManagement.Backend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public abstract class BaseController<TEntity, TRepository>(TRepository repository) : ControllerBase
        where TEntity : class, IDataModel
        where TRepository : IBaseRepository<TEntity>
    {
        private readonly TRepository _repository = repository;

        [HttpGet]
        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _repository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> GetById(int id)
        {
            var employee = await _repository.GetByIdAsync(id);
            if (employee == null) return NotFound();
            return employee;
        }

        [HttpPost]
        public virtual async Task<ActionResult> Add(TEntity entity)
        {
            await _repository.AddAsync(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }

        [HttpPut("{id}")]
        public virtual async Task<ActionResult> Update(int id, TEntity entity)
        {
            if (id != entity.Id) return BadRequest();
            await _repository.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public virtual async Task<ActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
