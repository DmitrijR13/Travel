using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FPCS.Data.Enums;

namespace FPCS.Data.Entities
{
    public class EmailInfo : BaseEntity
    {
        public Int64 EmailInfoId { get; set; }

        public Int64 PersonId { get; set; }

        public Int64 EmailLetterId { get; set; }

        //public Int64? EmailLetterId { get; set; } если поле не обязательно и может быть null

        public virtual EmailLetter EmailLetter { get; set; }
        public virtual Person Person { get; set; }
    }
}
