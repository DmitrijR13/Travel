using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FPCS.Data.Enums;

namespace FPCS.Data.Entities
{
    public class IncomingMessageJournal : BaseEntity
    {
        public Int64 IncomingMessageJournalId { get; set; }

        public DateTimeOffset Date { get; set; }

        public Int64 PersonId { get; set; }

        public virtual Person Person { get; set; }

        public String RequestContent { get; set; }

        public Int64 AcceptedById { get; set; }

        public virtual Worker AcceptedBy { get; set; }

        public Int64 ResponsibleId { get; set; }

        public virtual Worker Responsible { get; set; }

        public IncomingSource IncomingSource { get; set; }

        public String Result { get; set; }

        public SourceInfo SourceInfo { get; set; }
    }
}
