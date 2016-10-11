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

namespace FPCS.Web.Admin.Models.Worker
{
    public class WorkerEditModel
    {
        [Required]
        public Int64 WorkerId { get; set; }

        [Required]
        [Display(Name = "ФИО")]
        public String FIO { get; set; }

        [Display(Name = "Городской телефон")]
        public String Phone { get; set; }

        [Display(Name = "Сотовый телефой")]
        public String CellPhone { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public String Email { get; set; }

        [Display(Name = "Должность")]
        public String Job { get; set; }

        [Display(Name = "Дата начала работы")]
        public DateTimeOffset DateStart { get; set; }

        [Display(Name = "Дата увольнения")]
        public DateTimeOffset? DateFinish { get; set; }

      
    }
}