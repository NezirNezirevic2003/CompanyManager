using api.Data;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly UserDbContext _context;

        public EmployeeController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }

        [HttpPost("add_employee")]
        public IActionResult AddEmployee([FromBody] Employee employeeObj)
        {
            if(employeeObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.employeeModels.Add(employeeObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Employee added Successfully"
                });
            }
        }
        [HttpPut("update_employee")]
        public IActionResult UpdateEmployee([FromBody] Employee employeeObj)
        {
            if(employeeObj == null)
            {
                return BadRequest();
            }
            var user = _context.employeeModels.AsNoTracking().FirstOrDefault(x=>x.Id == employeeObj.Id);
            if(user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                _context.Entry(employeeObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Employee was successfullyy updated"
                });
            }
        }
        [HttpDelete("delete_employee/{id}")]

        public IActionResult DeleteEmployee(int id)
        {
            var user = _context.employeeModels.Find(id);
            if (user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                _context.Remove(user);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "User was succesfully deleted"
                });
            }
        }
        [HttpGet("get_all_employees")]
        public IActionResult GetAllEmployees()
        {
            var emplpyee = _context.employeeModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                EmployeeDetails = emplpyee
            }); ;
        }
        [HttpGet("get_employee/id")]
        public IActionResult GetEmployee(int id)
        {
            var employee = _context.employeeModels.Find(id);
            if(employee == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                return Ok(new
                {
                    StatusCode = 200,
                    EmployeeDetail = employee
                });
            }
        }

    }
}
