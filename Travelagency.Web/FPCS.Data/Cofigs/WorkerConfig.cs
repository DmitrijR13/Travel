using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

using FPCS.Data.Entities;

namespace FPCS.Data.Cofigs
{
    internal class WorkerConfig : EntityTypeConfiguration<Worker>
    {
        public WorkerConfig()
        {
            HasKey(x => x.WorkerId);
            Property(x => x.WorkerId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.FIO).HasMaxLength(100);

            Property(x => x.CellPhone).HasMaxLength(20);
            Property(x => x.Phone).HasMaxLength(20);
            Property(x => x.Email).HasMaxLength(50);
            Property(x => x.Job).HasMaxLength(100);
            Property(x => x.DateStart).IsRequired();
            Property(x => x.DateFinish);
            Property(x => x.IsDeleted).IsRequired();
            Property(x => x.CreatedDate).IsRequired();
            Property(x => x.UpdatedDate).IsRequired();

           
        }
    }
}