using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FPCS.Data.Enums;

namespace FPCS.Data.Entities
{
    public class FisicalPerson : BaseEntity
    {
        public Int64 PersonId { get; set; }

        public String FIO { get; set; }

        public String CellPhone { get; set; }

        public String Phone { get; set; }

        public String FieldOfActivity { get; set; }

        public String Email { get; set; }

        public WayOfInform WayOfInform { get; set; }

        public DateTimeOffset? DateOfBirth { get; set; }
    }
}
