using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FPCS.Data.Enums;

namespace FPCS.Data.Entities
{
    public class EmailLetter : BaseEntity
    {
        public Int64 EmailLetterId { get; set; }

        public String Theme { get; set; }

        public String Body { get; set; }

        public virtual ICollection<EmailInfo> EmailInfos { get; set; }
    }
}
