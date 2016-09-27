using System.Linq;
using System.Web;
using System.Web.Mvc;

using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Code
{
    public class FPCSAuthorizeAttribute: AuthorizeAttribute
    {
        public new Role[] Roles { get; private set; }

        public FPCSAuthorizeAttribute(params Role[] roles)
        {
            Roles = roles;
        }
        
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (!base.AuthorizeCore(httpContext)) return false;
            
            var user = httpContext.Session.GetUser();
            if (user == null || (Roles.Length > 0 && !Roles.Contains(user.Role))) return false;

            return true;
        }
    }
}