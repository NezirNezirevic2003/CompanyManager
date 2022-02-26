using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Salary { get; set; }

        public string Email { get; set; }

        public string MobileNumber { get; set; }

        public string Department { get; set; }


    }
}
