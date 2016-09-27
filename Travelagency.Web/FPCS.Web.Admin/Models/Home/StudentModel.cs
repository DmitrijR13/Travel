using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FPCS.Web.Admin.Models.Home
{
    public class StudentModel
    {
        public Guid DbUserId { get; set; }

        [Display(Name = "Student")]
        public String FullName { get; set; }
    }
}