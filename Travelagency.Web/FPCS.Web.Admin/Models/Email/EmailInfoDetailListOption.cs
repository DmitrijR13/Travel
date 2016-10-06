using System;

using FPCS.Core.jqGrid;
using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.Email
{
    public class EmailInfoDetailListOption
    {
        [GridProperty(ExtensionType.All, true)]
        public Guid? PersonId { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String FIO { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Email { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Phones { get; set; }
    }
}