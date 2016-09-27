using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

using FPCS.Data.Entities;

namespace FPCS.Data.Cofigs
{
    internal class AdminConfig : EntityTypeConfiguration<Admin>
    {
        public AdminConfig()
        {
            Map(x => { x.ToTable("Admin"); x.MapInheritedProperties(); });
        }
    }
}
