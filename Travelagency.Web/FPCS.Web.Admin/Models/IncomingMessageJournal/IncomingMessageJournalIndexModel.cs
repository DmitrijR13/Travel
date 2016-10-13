using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Core.Unity;

namespace FPCS.Web.Admin.Models.IncomingMessageJournal
{
    public class IncomingMessageJournalIndexModel
    {
        public Int64 IncomingMessageJournalId { get; set; }

        public String Date { get; set; }

        public String Fio { get; set; }

        public String Phones { get; set; }

        public String RequestContent { get; set; }

        public String AcceptedByWorkerFio { get; set; }

        public String ResponsibleWorkerFio { get; set; }

        public String IncomingSource { get; set; }

        public String Result { get; set; }

        public String SourceInfo { get; set; }

        public String IncomingSources { get; set; }

        public String SourceInfos { get; set; }
    }
}