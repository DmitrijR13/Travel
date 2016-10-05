using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

using FPCS.Data.Entities;

namespace FPCS.Data.Cofigs
{
    internal class EmailLetterConfig : EntityTypeConfiguration<EmailLetter>
    {
        public EmailLetterConfig()
        {
            HasKey(x => x.EmailLetterId);
            Property(x => x.EmailLetterId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.Theme).HasMaxLength(50);

            Property(x => x.Body);
           
            Property(x => x.IsDeleted).IsRequired();
            Property(x => x.CreatedDate).IsRequired();
            Property(x => x.UpdatedDate).IsRequired();
        }
    }
}