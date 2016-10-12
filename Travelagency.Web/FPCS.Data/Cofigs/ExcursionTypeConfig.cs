using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

using FPCS.Data.Entities;

namespace FPCS.Data.Cofigs
{
    internal class ExcursionTypeConfig : EntityTypeConfiguration<ExcursionType>
    {
        public ExcursionTypeConfig()
        {
            HasKey(x => x.ExcursionTypeId);
            Property(x => x.ExcursionTypeId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.PathName).HasMaxLength(100);

            Property(x => x.Description).HasMaxLength(1000);
            Property(x => x.TimeFrom);
            Property(x => x.TimeTo);
            Property(x => x.Price).IsRequired();
        }
    }
}