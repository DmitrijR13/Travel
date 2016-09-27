using System.Linq;
using System.Linq.Expressions;

using FPCS.Data.Enums;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.SessionModels;

namespace System.Web.Mvc.Html
{
    public static class HtmlHelperExtensions
    {
        public static SessionUserModel GetUser(this HtmlHelper htmlHelper)
        {
            return htmlHelper.ViewContext.HttpContext.Session.GetUser();
        }

        public static Boolean IsAccessEnabled(this HtmlHelper htmlHelper, params Role[] roles)
        {
            if (!htmlHelper.ViewContext.HttpContext.Request.IsAuthenticated) return false;

            var user = htmlHelper.GetUser();
            if (user == null || (roles.Length > 0 && !roles.Contains(user.Role))) return false;

            return true;
        }

        public static Int32 GetRoleCurrentUser(this HtmlHelper htmlHelper)
        {
            if (!htmlHelper.ViewContext.HttpContext.Request.IsAuthenticated) return 0;

            var user = htmlHelper.GetUser();
            if (user == null || (user != null && user.Role == null)) return 0;

            return (Int32)user.Role;
        }
        public static String GetRoleCurrentUserString (this HtmlHelper htmlHelper)
        {
            if (!htmlHelper.ViewContext.HttpContext.Request.IsAuthenticated) return String.Empty;
            var user = htmlHelper.GetUser();
            if (user == null || (user != null && user.Role == null)) return String.Empty;

            return user.Role.ToString();
        }
    }
}