using Microsoft.EntityFrameworkCore;
using EmployeeManagement.Backend.Models;
using System.Reflection.Metadata;

namespace EmployeeManagement.Backend.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .ToTable(tb => tb.HasTrigger("SomeTrigger"));
        }
    }
}
