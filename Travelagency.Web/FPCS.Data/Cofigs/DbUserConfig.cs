using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

using FPCS.Data.Entities;

namespace FPCS.Data.Cofigs
{
    internal class DbUserConfig : EntityTypeConfiguration<DbUser>
    {
        public DbUserConfig()
        {
            HasKey(x => x.DbUserId);
            Property(x => x.DbUserId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.UnqDbUserId).IsRequired();

            Property(x => x.Login).IsRequired().HasMaxLength(100);
            Property(x => x.Password).IsRequired().HasMaxLength(100);
            Property(x => x.Email).HasMaxLength(100);
            Property(x => x.FirstName).IsRequired().HasMaxLength(100);
            Property(x => x.LastName).IsRequired().HasMaxLength(100);
            Property(x => x.FullName).IsRequired().HasMaxLength(200);
            Property(x => x.MiddleInitial).HasMaxLength(50);
            Property(x => x.IsLocked).IsRequired();
            Property(x => x.IsDeleted).IsRequired();
            Property(x => x.CreatedDate).IsRequired();
            Property(x => x.UpdatedDate).IsRequired();

            Property(x => x.Role).IsRequired();
        }
    }
}
