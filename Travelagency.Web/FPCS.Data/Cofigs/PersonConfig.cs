using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

using FPCS.Data.Entities;

namespace FPCS.Data.Cofigs
{
    internal class PersonConfig : EntityTypeConfiguration<Person>
    {
        public PersonConfig()
        {
            HasKey(x => x.PersonId);
            Property(x => x.PersonId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.FIO).HasMaxLength(100);

            Property(x => x.CellPhone).HasMaxLength(20);
            Property(x => x.Phone).HasMaxLength(20);
            Property(x => x.Email).HasMaxLength(100);
            Property(x => x.FieldOfActivity).HasMaxLength(100);
            Property(x => x.DateOfBirth);
            Property(x => x.IsDeleted).IsRequired();
            Property(x => x.CreatedDate).IsRequired();
            Property(x => x.UpdatedDate).IsRequired();

            Property(x => x.WayOfInform).IsRequired();
            Property(x => x.TypePerson).IsRequired();
        }
    }
}