using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.Backend.Repositories
{
    public interface IBaseRepository<TEntity>
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(int id);
        Task AddAsync(TEntity entity);
        Task UpdateAsync(TEntity entity);
        Task DeleteAsync(int id);
    }
}