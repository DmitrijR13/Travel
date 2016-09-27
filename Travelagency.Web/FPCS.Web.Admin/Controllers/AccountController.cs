using System;
using System.Web.Mvc;
using System.Web.Security;
using FPCS.Data;
using FPCS.Data.Repo;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.Account;
using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Controllers
{
	[Authorize]
	public class AccountController : BaseController
	{
		[AllowAnonymous]
		public ActionResult Login(string returnUrl)
		{
			ViewBag.ReturnUrl = returnUrl;

			LoginModel model = new LoginModel();
			model.RememberMe = true;

			return View(model);
		}

		[HttpPost]
		[AllowAnonymous]
		//[ValidateAntiForgeryToken]
		public ActionResult Login(LoginModel model, String returnUrl)
		{
			try
			{
				if (ModelState.IsValid)
				{
					using (var uow = UnityManager.Resolve<IUnitOfWork>())
					{
						var user = uow.GetRepo<IDbUserRepo>().GetByLoginAndPass(model.Login, model.Password);
						if (user == null)
						{
							ModelState.AddModelError("", "The user name or password provided is incorrect.");
						}
						else if (user.IsLocked)
						{
							ModelState.AddModelError("", "Your account was locked.");
						}
						else
						{
							FormsAuthentication.SetAuthCookie(user.Login, model.RememberMe);

							if (Url.IsLocalUrl(returnUrl))
							{
								return Redirect(returnUrl);
							}
							else
							{
								return RedirectToAction("Index", "Home");
							}
						}
					}
				}
			}
			catch (Exception ex)
			{
				ModelState.AddModelError("", ErrorCodeToString(MembershipCreateStatus.ProviderError));
			}
			return View(model);
		}


		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult LogOff()
		{
			FormsAuthentication.SignOut();

			return RedirectToAction("Index", "Home");
		}


		//[AllowAnonymous]
		//public ActionResult Register()
		//{
		//    return View();
		//}

		//[HttpPost]
		//[AllowAnonymous]
		//[ValidateAntiForgeryToken]
		//public ActionResult Register(RegisterModel model)
		//{
		//    if (ModelState.IsValid)
		//    {
		//        // Attempt to register the user
		//        try
		//        {
		//            WebSecurity.CreateUserAndAccount(model.UserName, model.Password);
		//            WebSecurity.Login(model.UserName, model.Password);
		//            return RedirectToAction("Index", "Home");
		//        }
		//        catch (MembershipCreateUserException e)
		//        {
		//            ModelState.AddModelError("", ErrorCodeToString(e.StatusCode));
		//        }
		//    }

		//    // If we got this far, something failed, redisplay form
		//    return View(model);
		//}

		#region Helpers

		private static string ErrorCodeToString(MembershipCreateStatus createStatus)
		{
			// See http://go.microsoft.com/fwlink/?LinkID=177550 for
			// a full list of status codes.
			switch (createStatus)
			{
				case MembershipCreateStatus.DuplicateUserName:
					return "User name already exists. Please enter a different user name.";

				case MembershipCreateStatus.DuplicateEmail:
					return "A user name for that e-mail address already exists. Please enter a different e-mail address.";

				case MembershipCreateStatus.InvalidPassword:
					return "The password provided is invalid. Please enter a valid password value.";

				case MembershipCreateStatus.InvalidEmail:
					return "The e-mail address provided is invalid. Please check the value and try again.";

				case MembershipCreateStatus.InvalidAnswer:
					return "The password retrieval answer provided is invalid. Please check the value and try again.";

				case MembershipCreateStatus.InvalidQuestion:
					return "The password retrieval question provided is invalid. Please check the value and try again.";

				case MembershipCreateStatus.InvalidUserName:
					return "The user name provided is invalid. Please check the value and try again.";

				case MembershipCreateStatus.ProviderError:
					return
						"The authentication provider returned an error. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

				case MembershipCreateStatus.UserRejected:
					return
						"The user creation request has been canceled. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

				default:
					return
						"An unknown error occurred. Please verify your entry and try again. If the problem persists, please contact your system administrator.";
			}
		}

		#endregion
	}
}
