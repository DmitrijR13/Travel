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

namespace FPCS.Web.Admin.Models.ExpensesType
{
    public class ExpensesTypeCreateModel
    {
        [Required]
        [Display(Name = "Наименование расхода")]
        public String ExpensesName { get; set; }

        [Display(Name = "Примечание")]
        public String Remark { get; set; }
    }
}