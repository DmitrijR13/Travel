using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FPCS.Data.Enums;

namespace FPCS.Data.Entities
{
    public class Worker : BaseEntity
    {
        public Int64 WorkerId { get; set; }

        public String FIO { get; set; }

        public String CellPhone { get; set; }

        public String Phone { get; set; }

        public String Job { get; set; }

        public String Email { get; set; }

        public DateTimeOffset DateStart { get; set; }

        public DateTimeOffset? DateFinish { get; set; }

        public virtual ICollection<IncomingMessageJournal> AcceptedsBy { get; set; }

        public virtual ICollection<IncomingMessageJournal> Responsibles { get; set; }
    }
}
