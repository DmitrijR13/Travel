using System;

using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.SessionModels
{
    public class SessionUserModel
    {
        public Guid UserId { get; set; }

        public Role Role { get; set; }

        public String Login { get; set; }

        public String FirstName { get; set; }

        public String LastName { get; set; }

        public String FullName { get; set; }
    }
}