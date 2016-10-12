using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FPCS.Data.Enums;

namespace FPCS.Data.Entities
{
    public class ExpensesType : BaseEntity
    {
        public Int64 ExpensesTypeId { get; set; }

        public String ExpensesName { get; set; }

        public String Remark { get; set; }
    }
}
