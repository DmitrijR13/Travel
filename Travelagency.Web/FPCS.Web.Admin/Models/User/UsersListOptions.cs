using System;

using FPCS.Core.jqGrid;
using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.User
{
    public class UsersListOptions
    {
        [GridProperty(ExtensionType.All, true)]
        public Guid? DbUserId { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String FullName { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Email { get; set; }

        [GridProperty(ExtensionType.All, true)]
        public Role? Role { get; set; }

        [GridProperty(ExtensionType.All, true)]
        public Boolean? IsLocked { get; set; }
    }
}