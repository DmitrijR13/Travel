using System;

using FPCS.Core.jqGrid;
using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.IncomingMessageJournal
{
    public class IncomingMessageJournalListOptions
    {
        [GridProperty(ExtensionType.All, true)]
        public Guid? IncomingMessageJournalId { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Fio { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String AcceptedByWorkerFio { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String ResponsibleWorkerFio { get; set; }

        [GridProperty(ExtensionType.Filter, false)]
        public IncomingSource? IncomingSource { get; set; }

        [GridProperty(ExtensionType.Filter, false)]
        public SourceInfo? SourceInfo { get; set; }
    }
}