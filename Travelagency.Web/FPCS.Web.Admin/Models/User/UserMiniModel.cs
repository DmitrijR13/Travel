using System;

using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.User
{
    public class UserMiniModel
    {
        public Guid DbUserId { get; set; }

        public String FullName { get; set; }

        public String Email { get; set; }

        public Role Role { get; set; }

        public String RoleStr { get { return Role.ToString(); } }

        public String IsLocked { get; set; }
    }
}