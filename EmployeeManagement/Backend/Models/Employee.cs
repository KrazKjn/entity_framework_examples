using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EmployeeManagement.Backend.Models
{
    public class Employee : IDataModel
    {
        [NotMapped]
        [JsonIgnore]
        public int Id
        {
            get { return EmployeeId ?? 0; }
            set { EmployeeId = value; }
        }
        public int? EmployeeId { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public int? DepartmentId { get; set; }
        //public Department? Department { get; set; }
        public required string Email { get; set; }
        public DateTime DateHired { get; set; }
        public decimal Salary { get; set; }
        public Employee()
        {
            DepartmentId = 0;
        }
    }
}
