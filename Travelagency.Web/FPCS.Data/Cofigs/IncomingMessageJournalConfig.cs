using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

using FPCS.Data.Entities;

namespace FPCS.Data.Cofigs
{
    internal class IncomingMessageJournalConfig : EntityTypeConfiguration<IncomingMessageJournal>
    {
        public IncomingMessageJournalConfig()
        {
            HasKey(x => x.IncomingMessageJournalId);
            Property(x => x.IncomingMessageJournalId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.Date).IsRequired();
            Property(x => x.RequestContent).HasMaxLength(500);
            Property(x => x.IncomingSource);
            Property(x => x.Result).HasMaxLength(500);
            Property(x => x.SourceInfo);

            Property(x => x.PersonId).IsRequired();
            HasRequired(x => x.Person).WithMany(x => x.IncomingMessageJournals).HasForeignKey(x => x.PersonId).WillCascadeOnDelete(false);

            Property(x => x.AcceptedById).IsRequired();
            HasRequired(x => x.AcceptedBy).WithMany(x => x.AcceptedsBy).HasForeignKey(x => x.AcceptedById).WillCascadeOnDelete(false);

            Property(x => x.ResponsibleId).IsRequired();
            HasRequired(x => x.Responsible).WithMany(x => x.Responsibles).HasForeignKey(x => x.ResponsibleId).WillCascadeOnDelete(false);

            //HasOptional если поле не обязательно и может быть null
            Property(x => x.IsDeleted).IsRequired();
            Property(x => x.CreatedDate).IsRequired();
            Property(x => x.UpdatedDate).IsRequired();
        }
    }
}