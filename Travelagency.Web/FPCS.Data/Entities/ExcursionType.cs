using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FPCS.Data.Enums;

namespace FPCS.Data.Entities
{
    public class ExcursionType : BaseEntity
    {
        public Int64 ExcursionTypeId { get; set; }

        public String PathName { get; set; }

        public String Description { get; set; }

        public Time TimeFrom { get; set; }

        public Time TimeTo { get; set; }

        public Decimal Price { get; set; }

    }
}
