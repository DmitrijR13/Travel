using FPCS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FPCS.Web.Admin.Models.User
{
    public class ProfileDetailsModel
    {
        public ProfileDetailsModel()
        {
        }

        public ProfileDetailsModel(DbUser data)
        {
            DbUserId = data.DbUserId;
            FullName = data.FullName;
            Email = data.Email;
            Login = data.Login;
        }

        [Display(Name = "DbUserId")]
        public Guid DbUserId { get; set; }

        [Display(Name = "Full Name")]
        public String FullName { get; set; }

        [Display(Name = "Email")]
        public String Email { get; set; }

        [Display(Name = "Login")]
        public String Login { get; set; }
    }
}