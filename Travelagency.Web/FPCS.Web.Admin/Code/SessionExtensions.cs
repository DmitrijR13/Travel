using System;
using System.Web;
using System.Web.Security;

using FPCS.Core.Unity;
using FPCS.Data;
using FPCS.Data.Repo;
using FPCS.Web.Admin.Models.SessionModels;

namespace FPCS.Web.Admin.Code
{
    public static class SessionExtensions
    {
        public static SessionUserModel GetUser(this HttpSessionStateWrapper session)
        {
            return GetUser(session);
        }

        public static SessionSchoolYearModel GetSchoolYear(this HttpSessionStateWrapper session)
        {
            return GetSchoolYear(session);
        }

        public static SessionSchoolYearModel SetSchoolYear(this HttpSessionStateWrapper session, Int32 year)
        {
            return SetSchoolYear(session, year);
        }


        public static SessionUserModel GetUser(this HttpSessionStateBase session)
        {
            var user = (SessionUserModel)session["user"];
            if (user == null || user.Login != HttpContext.Current.User.Identity.Name)
            {
                using (var uow = UnityManager.Instance.Resolve<IUnitOfWork>())
                {
                    var repo = uow.GetRepo<IDbUserRepo>();
                    var dbUser = repo.GetNotLockedByLogin(HttpContext.Current.User.Identity.Name);
                    if (dbUser == null)
                    {
                        FormsAuthentication.SignOut();
                        return null;
                    }
                    user = new SessionUserModel
                    {
                        UserId = dbUser.DbUserId,
                        Role = dbUser.Role,
                        Login = dbUser.Login,
                        FirstName = dbUser.FirstName,
                        LastName = dbUser.LastName,
                        FullName = dbUser.FullName
                    };
                    session["user"] = user;
                }
            }

            return user;
        }

       

       
    }
}