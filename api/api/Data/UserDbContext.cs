using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext>options):base(options)
        {

        }
        public DbSet<User> userModels { get; set; } 
        public DbSet<Employee> employeeModels { get; set; }
        public DbSet<Department> departmentModels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("tbl_user");
            modelBuilder.Entity<Employee>().ToTable("tbl_employee");
            modelBuilder.Entity<Department>().ToTable("tbl_department");

        }

    }
}
