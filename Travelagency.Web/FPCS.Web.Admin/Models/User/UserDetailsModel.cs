using System;
using System.ComponentModel.DataAnnotations;

using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.User
{
    public class UserDetailsModel
    {
        public Guid DbUserId { get; set; }

        [Display(Name = "Full name")]
        public String FullName { get; set; }

        [Display(Name = "Role")]
        public String Role { get; set; }

        [Display(Name = "Email")]
        public String Email { get; set; }

        [Display(Name = "Login")]
        public String Login { get; set; }

        [Display(Name = "Is User account Locked")]
        public Boolean IsLocked { get; set; }
    }
}