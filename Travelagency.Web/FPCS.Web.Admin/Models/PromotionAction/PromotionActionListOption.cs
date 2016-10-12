using System;

using FPCS.Core.jqGrid;
using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.PromotionAction
{
    public class PromotionActionListOptions
    {
        [GridProperty(ExtensionType.All, true)]
        public Guid? PromotionActionId { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Name { get; set; }

        [GridProperty(ExtensionType.Filter, false)]
        public PrAction? PrAction { get; set; }
    }
}