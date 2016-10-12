using System;

using FPCS.Core.jqGrid;
using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.ExpensesType
{
    public class ExpensesTypeListOptions
    {
        [GridProperty(ExtensionType.All, true)]
        public Guid? ExpensesTypeId { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String ExpensesName { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Remark { get; set; }
    }
}