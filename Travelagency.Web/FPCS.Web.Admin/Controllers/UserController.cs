using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using FPCS.Core.jqGrid;
using FPCS.Core.Extensions;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.User;
using FPCS.Core;
using FPCS.Data.Entities;

namespace FPCS.Web.Admin.Controllers
{
    [FPCSAuthorize(Role.Admin)]
    public class UserController : BaseController
    {
        public ActionResult Index()
        {
            UserIndexModel model = new UserIndexModel();

            model.IsLocked = "true:True;false:False";
            model.Roles = String.Format(@"{0}:{1};", ((Int32)Role.Admin).ToString(), Role.Admin.GetDescription());

            return View(model);
        }

        public JsonResult _Index(GridOptions options, UsersListOptions usersListOptions)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var role = usersListOptions.Role;
                var isLocked = usersListOptions.IsLocked;

                var dbList = uow.GetRepo<IDbUserRepo>()
                                .GetByRoles(Role.Admin)
                                .Where(x => ((role.HasValue && x.Role == role.Value) || !role.HasValue) &&
                                            ((isLocked.HasValue && x.IsLocked == isLocked.Value) || !isLocked.HasValue));

                var engine = new GridDynamicEngine(options, usersListOptions);

                usersListOptions.IsLocked = null;
                usersListOptions.Role = null;

                var result = engine.ApplyAll(dbList, x => new UserMiniModel
                {
                    DbUserId = x.DbUserId,
                    FullName = x.LastName + ", " + x.FirstName,
                    Email = x.Email,
                    IsLocked = x.IsLocked ? "Locked" : "Not Locked",
                    Role = x.Role
                });

                return Json(result);
            }
        }
        
        [HttpGet]
        public ActionResult _Details(Guid id)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var dbEntity = uow.GetRepo<IDbUserRepo>().Get(id);
                if (dbEntity == null) return ErrorPartial("User {0} not found", id);

                var model = new UserDetailsModel
                {
                    DbUserId = dbEntity.DbUserId,
                    FullName = dbEntity.FullName,
                    Email = dbEntity.Email,
                    Login = dbEntity.Login,
                    Role = dbEntity.Role.GetDescription(),
                    IsLocked = dbEntity.IsLocked
                };

                return PartialView(model);
            }
        }

        [HttpGet]
        public ActionResult _Create()
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var model = new UserCreateModel
                {
                    FirstName = String.Empty,
                    LastName = String.Empty,
                    MiddleInitial = String.Empty,
                    Email = String.Empty,
                    Login = String.Empty,
                    Role = Role.Admin.GetDescription()
                };

                return PartialView(model);
            }
        }

        [HttpPost]
        public ActionResult _Create(UserCreateModel model)
        {
            if (model.IsSendEmail && (String.IsNullOrEmpty(model.Password) || String.IsNullOrEmpty(model.Email)))
            {
                ModelState.AddModelError("", "If you want send Email to user, please enter email address and password");
                if (String.IsNullOrEmpty(model.Password)) ModelState.AddModelError("Password", "*");
                if (String.IsNullOrEmpty(model.Email)) ModelState.AddModelError("Email", "*");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IAdminRepo>();
                        var dbEntity = repo.Add(model.Login, model.Password, model.Email, model.FirstName, model.LastName, model.MiddleInitial);
                        uow.Commit();

                        if (model.IsSendEmail)
                        {
                            var subject = "Your account on FPCS was activated";
                            var body = "Your account on FPCS was activated. Your credentials:\r\n";
                            body += String.Format("Login: {0}\r\nPassword: {1}", model.Login, model.Password);
                            EmailSender.Instance.Send(dbEntity.Email, subject, body);
                        }

                        return JsonRes(dbEntity.DbUserId.ToString());
                    }
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
            }

            return PartialView(model);
        }

        [HttpGet]
        public ActionResult _Edit(Guid id)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var dbEntity = uow.GetRepo<IDbUserRepo>().Get(id);
                if (dbEntity == null) return ErrorPartial("User {0} not found", id);

                var model = new UserEditModel
                {
                    DbUserId = dbEntity.DbUserId,
                    FullName = dbEntity.FullName,
                    Email = dbEntity.Email,
                    Login = dbEntity.Login,
                    Role = dbEntity.Role.GetDescription(),
                    IsLocked = dbEntity.IsLocked
                };

                return PartialView(model);
            }
        }

        [HttpPost]
        public ActionResult _Edit(UserEditModel model)
        {
            if (model.IsSendEmail && (String.IsNullOrEmpty(model.Password) || String.IsNullOrEmpty(model.Email)))
            {
                ModelState.AddModelError("", "If you want send Email to user, please enter email address and password");
                if (String.IsNullOrEmpty(model.Password)) ModelState.AddModelError("Password", "*");
                if (String.IsNullOrEmpty(model.Email)) ModelState.AddModelError("Email", "*");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IDbUserRepo>();
                        var dbEntity = repo.Update(model.DbUserId, model.Email, model.Login, model.Password, model.IsLocked);
                        uow.Commit();

                        if (model.IsSendEmail)
                        {
                            var subject = "Your account on FPCS was activated";
                            var body = "Your account on FPCS was activated. Your credentials:\r\n";
                            body += String.Format("Login: {0}\r\nPassword: {1}", model.Login, model.Password);
                            EmailSender.Instance.Send(dbEntity.Email, subject, body);
                        }

                        return JsonRes(dbEntity.DbUserId.ToString());
                    }
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
            }

            return PartialView(model);
        }

        [HttpGet]
        public ActionResult ProfileDetails()
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var repo = uow.GetRepo<IDbUserRepo>();
                Guid dbUserId = User.UserId;

                DbUser dbUser = repo.Get(dbUserId);

                ProfileDetailsModel model = new ProfileDetailsModel(dbUser);

                return View(model);
            }
        }

        [HttpGet]
        public ActionResult ProfileEdit()
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var repo = uow.GetRepo<IDbUserRepo>();
                Guid dbUserId = User.UserId;

                DbUser dbUser = repo.Get(dbUserId);

                ProfileEditModel model = new ProfileEditModel(dbUser);

                return View(model);
            }
        }

        [HttpPost]
        public ActionResult ProfileEdit(ProfileEditModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IDbUserRepo>();
                        var dbEntity = repo.Get(model.DbUserId);

                        dbEntity.FirstName = model.FirstName.TrimAndReduce();
                        dbEntity.LastName = model.LastName.TrimAndReduce();
                        dbEntity.MiddleInitial = model.MI.TrimAndReduce();
                        dbEntity.FullName = String.Format(@"{0}, {1}", model.LastName.TrimAndReduce(), model.FirstName.TrimAndReduce());
                        dbEntity.Email = model.Email.TrimAndReduce();
                        dbEntity.Login = model.Login;
                        dbEntity.Password = model.Password;
                        dbEntity.UpdatedDate = DateTimeOffset.Now;

                        repo.Update(dbEntity);

                        uow.Commit();

                        return RedirectToAction("ProfileDetails");
                    }
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
            }

            return View(model);
        }

        [HttpPost]
        public ActionResult Delete(Guid id)
        {
            try
            {
                using (var uow = UnityManager.Resolve<IUnitOfWork>())
                {
                    var repo = uow.GetRepo<IDbUserRepo>();
                    repo.Remove(id);

                    uow.Commit();
                    return JsonRes();
                }
            }
            catch (Exception ex)
            {
                return JsonRes(Status.Error, ex.Message);
            }
        }
    }
}
