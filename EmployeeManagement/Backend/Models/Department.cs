using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EmployeeManagement.Backend.Models
{
    public class Department : IDataModel
    {
        [NotMapped]
        [JsonIgnore]
        public int Id
        {
            get { return DepartmentId; }
            set { DepartmentId = value; }
        }
        public int DepartmentId { get; set; }
        public required string DepartmentName { get; set; }
        public ICollection<Employee>? Employees { get; set; }
    }
}
