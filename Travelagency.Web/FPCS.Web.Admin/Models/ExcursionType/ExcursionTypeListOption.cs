using System;

using FPCS.Core.jqGrid;
using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.ExcursionType
{
    public class ExcursionTypeListOptions
    {
        [GridProperty(ExtensionType.All, true)]
        public Guid? ExcursionTypeId { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String PathName { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Description { get; set; }
    }
}