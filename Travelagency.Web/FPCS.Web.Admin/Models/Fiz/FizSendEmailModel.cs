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

namespace FPCS.Web.Admin.Models.Fiz
{
    public class FizSendEmailModel
    {        
        [Display(Name = "Тема письма")]
        public String Theme { get; set; }

        [Display(Name = "Текст письма")]
        public String Body { get; set; }

        public String Emails { get; set; }

        public String PersonIds { get; set; }
    }
}