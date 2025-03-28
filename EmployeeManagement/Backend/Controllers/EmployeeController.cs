using EmployeeManagement.Backend.Models;
using EmployeeManagement.Backend.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.Backend.Controllers
{
    [EnableCors("AllowReactApp")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController(EmployeeRepository repository) : BaseController<Employee, EmployeeRepository>(repository)
    {

    }
}
