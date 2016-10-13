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
            modelBuilder.Configurations.Add(new WorkerConfig());
            modelBuilder.Configurations.Add(new ExpensesTypeConfig());
            modelBuilder.Configurations.Add(new ExcursionTypeConfig());
            modelBuilder.Configurations.Add(new PromotionActionConfig());
            modelBuilder.Configurations.Add(new IncomingMessageJournalConfig());
        }
    }
}
