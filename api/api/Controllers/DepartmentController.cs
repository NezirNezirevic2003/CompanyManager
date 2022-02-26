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
    public class DepartmentController : ControllerBase
    {
        private readonly UserDbContext _context;

        public DepartmentController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }

        [HttpPost("add_department")]
        public IActionResult AddDepartment([FromBody] Department departmentObj)
        {
            if (departmentObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.departmentModels.Add(departmentObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Department added Successfully"
                });
            }
        }

        [HttpGet("get_all_departments")]
        public IActionResult GetAllDepartments()
        {
            var department = _context.departmentModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                DepartmentDetails = department
            }); ;
        }

        [HttpPut("update_department")]
        public IActionResult UpdateDepartment([FromBody] Department departmentObj)
        {
            if (departmentObj == null)
            {
                return BadRequest();
            }
            var department = _context.departmentModels.AsNoTracking().FirstOrDefault(x => x.Id == departmentObj.Id);
            if (department == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Department Not Found"
                });
            }
            else
            {
                _context.Entry(departmentObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Department was successfullyy updated"
                });
            }
        }

        [HttpDelete("delete_department/{id}")]

        public IActionResult DeleteDepartment(int id)
        {
            var department = _context.departmentModels.Find(id);
            if (department == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Department Not Found"
                });
            }
            else
            {
                _context.Remove(department);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Department was succesfully deleted"
                });
            }
        }
    }
}
