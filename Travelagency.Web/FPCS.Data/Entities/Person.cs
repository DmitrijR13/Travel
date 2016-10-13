using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FPCS.Data.Enums;

namespace FPCS.Data.Entities
{
    public class Person : BaseEntity
    {
        public Int64 PersonId { get; set; }

        public TypePerson TypePerson { get; set; }

        public String FIO { get; set; }

        public String CellPhone { get; set; }

        public String Phone { get; set; }

        public String FieldOfActivity { get; set; }

        public String Email { get; set; }

        public WayOfInform WayOfInform { get; set; }

        public TypeFiz TypeFiz { get; set; }

        public DateTimeOffset? DateOfBirth { get; set; }

        public virtual ICollection<EmailInfo> EmailInfos { get; set; }

        public virtual ICollection<IncomingMessageJournal> IncomingMessageJournals { get; set; }
    }
}
