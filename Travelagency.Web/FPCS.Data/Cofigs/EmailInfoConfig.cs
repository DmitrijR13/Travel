using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

using FPCS.Data.Entities;

namespace FPCS.Data.Cofigs
{
    internal class EmailInfoConfig : EntityTypeConfiguration<EmailInfo>
    {
        public EmailInfoConfig()
        {
            HasKey(x => x.EmailInfoId);
            Property(x => x.EmailInfoId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

          
            Property(x => x.PersonId).IsRequired();

            HasRequired(x => x.EmailLetter).WithMany(x => x.EmailInfos).HasForeignKey(x => x.EmailLetterId).WillCascadeOnDelete(false);
            HasRequired(x => x.Person).WithMany(x => x.EmailInfos).HasForeignKey(x => x.PersonId).WillCascadeOnDelete(false);
            //HasOptional если поле не обязательно и может быть null
            Property(x => x.IsDeleted).IsRequired();
            Property(x => x.CreatedDate).IsRequired();
            Property(x => x.UpdatedDate).IsRequired();
        }
    }
}