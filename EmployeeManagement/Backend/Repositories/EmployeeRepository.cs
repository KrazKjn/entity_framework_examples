using EmployeeManagement.Backend.Data;
using EmployeeManagement.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Backend.Repositories
{
    public class EmployeeRepository(ApplicationDbContext context) : IBaseRepository<Employee>
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            //return await _context.Employees.Include(e => e.Department).ToListAsync();
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            //return await _context.Employees.Include(e => e.Department).FirstOrDefaultAsync(e => e.EmployeeId == id);
            return await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId == id);
        }

        public async Task AddAsync(Employee employee)
        {
            if (!employee.DepartmentId.HasValue)
                employee.DepartmentId = 0;
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee != null)
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
            }
        }
    }
}
