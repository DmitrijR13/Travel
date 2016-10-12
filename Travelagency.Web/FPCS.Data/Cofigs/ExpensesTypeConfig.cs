using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

using FPCS.Data.Entities;

namespace FPCS.Data.Cofigs
{
    internal class ExpensesTypeConfig : EntityTypeConfiguration<ExpensesType>
    {
        public ExpensesTypeConfig()
        {
            HasKey(x => x.ExpensesTypeId);
            Property(x => x.ExpensesTypeId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.ExpensesName).HasMaxLength(50);

            Property(x => x.Remark).HasMaxLength(1000);
        }
    }
}