using FPCS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FPCS.Web.Admin.Models.User
{
    public class ProfileEditModel
    {
        public ProfileEditModel()
        {
        }

        public ProfileEditModel(DbUser data)
        {
            DbUserId = data.DbUserId;
            FirstName = data.FirstName;
            LastName = data.LastName;
            MI = data.MiddleInitial;
            Email = data.Email;
            Login = data.Login;
            Password = String.Empty;
        }

        [Required]
        [Display(Name = "DbUserId")]
        public Guid DbUserId { get; set; }

        [Required]
        [Display(Name = "First name")]
        public String FirstName { get; set; }

        [Required]
        [Display(Name = "Last name")]
        public String LastName { get; set; }

        [Display(Name = "Middle Initial")]
        public String MI { get; set; }

        [Display(Name = "Email")]
        public String Email { get; set; }

        [Required]
        [Display(Name = "Login")]
        public String Login { get; set; }

        [Required]
        [Display(Name = "Password")]
        public String Password { get; set; }
    }
}