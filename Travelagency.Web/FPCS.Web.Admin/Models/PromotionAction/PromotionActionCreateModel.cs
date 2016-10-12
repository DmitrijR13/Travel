using FPCS.Core.Extensions;
using FPCS.Core.Unity;
using FPCS.Data;
using FPCS.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FPCS.Web.Admin.Models.PromotionAction
{
    public class PromotionActionCreateModel
    {
        [Required]
        [Display(Name = "Наименование")]
        public String Name { get; set; }

        [Required]
        [Display(Name = "Дата начала")]
        public DateTimeOffset DateStart { get; set; }

        [Required]
        [Display(Name = "Дата окончания")]
        public DateTimeOffset DateFinish { get; set; }

        [Required]
        [Display(Name = "Форма проведения")]
        public PrAction PrAction { get; set; }
    }
}