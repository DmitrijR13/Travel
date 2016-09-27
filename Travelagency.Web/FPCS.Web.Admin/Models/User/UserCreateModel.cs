using System;
using System.ComponentModel.DataAnnotations;

using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.User
{
    public class UserCreateModel
    {
        [Required]
        public Guid DbUserId { get; set; }

        [Required]
        [Display(Name = "First name")]
        public String FirstName { get; set; }

        [Required]
        [Display(Name = "Last name")]
        public String LastName { get; set; }

        [Display(Name = "Middle Initial")]
        public String MiddleInitial { get; set; }

        [Display(Name = "Role")]
        public String Role { get; set; }

        [Display(Name = "Email")]
        public String Email { get; set; }

        [Required]
        [Display(Name = "Login")]
        public String Login { get; set; }

        [Required]
        [Display(Name = "Password")]
        public String Password { get; set; }
        
        [Required]
        [Display(Name = "Send Email with login and password to user")]
        public Boolean IsSendEmail { get; set; }
    }
}