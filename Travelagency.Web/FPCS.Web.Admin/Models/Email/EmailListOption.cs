using System;

using FPCS.Core.jqGrid;
using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.Email
{
    public class EmailListOptions
    {
        [GridProperty(ExtensionType.All, true)]
        public Guid? EmailLetterId { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Theme { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Body { get; set; }
    }
}