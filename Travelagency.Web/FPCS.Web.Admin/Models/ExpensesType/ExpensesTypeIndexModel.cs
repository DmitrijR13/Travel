using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Core.Unity;

namespace FPCS.Web.Admin.Models.ExpensesType
{
    public class ExpensesTypeIndexModel
    {
        public Int64 ExpensesTypeId { get; set; }

        public String ExpensesName { get; set; }

        public String Remark { get; set; }
    }
}