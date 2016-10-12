using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FPCS.Data.Enums;

namespace FPCS.Data.Entities
{
    public class PromotionAction : BaseEntity
    {
        public Int64 PromotionActionId { get; set; }

        public String Name { get; set; }

        public DateTimeOffset DateStart { get; set; }

        public DateTimeOffset DateFinish { get; set; }

        public PrAction PrAction { get; set; }
    }
}
