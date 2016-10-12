using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

using FPCS.Data.Entities;

namespace FPCS.Data.Cofigs
{
    internal class PromotionActionConfig : EntityTypeConfiguration<PromotionAction>
    {
        public PromotionActionConfig()
        {
            HasKey(x => x.PromotionActionId);
            Property(x => x.PromotionActionId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.Name).HasMaxLength(1000);

            Property(x => x.DateStart).IsRequired();

            Property(x => x.DateFinish).IsRequired();
            Property(x => x.PrAction).IsRequired();
        }
    }
}