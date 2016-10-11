using System;

using FPCS.Core.jqGrid;
using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.Worker
{
    public class WorkerListOptions
    {
        [GridProperty(ExtensionType.All, true)]
        public Guid? WorkerId { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String FIO { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Email { get; set; }

        [GridProperty(ExtensionType.Filter, false)]
        public String Job { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Phones { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public DateTimeOffset DateStart { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public DateTimeOffset? DateFinish { get; set; }
    }
}