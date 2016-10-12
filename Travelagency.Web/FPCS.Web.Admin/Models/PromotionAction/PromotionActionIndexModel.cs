using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Core.Unity;

namespace FPCS.Web.Admin.Models.PromotionAction
{
    public class PromotionActionIndexModel
    {
        public Int64 PromotionActionId { get; set; }

        public String Name { get; set; }

        public String DateStart { get; set; }

        public String DateFinish { get; set; }

        public String PrAction { get; set; }

        public String PrActions { get; set; }
    }
}