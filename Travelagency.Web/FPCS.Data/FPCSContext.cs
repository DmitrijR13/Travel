using System.Data.Entity;

using FPCS.Data.Cofigs;

namespace FPCS.Data
{
    internal class StudentManagementContext : DbContext
    {
        public StudentManagementContext()
            : base("ConnectionString")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new DbUserConfig());
            modelBuilder.Configurations.Add(new AdminConfig());
            modelBuilder.Configurations.Add(new PersonConfig());
            modelBuilder.Configurations.Add(new EmailInfoConfig());
            modelBuilder.Configurations.Add(new EmailLetterConfig());

        }
    }
}
