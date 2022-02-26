using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Department
    {
        [Key]
        public int Id { get; set; }

        public string DepartmentName { get; set; }

    }
}
