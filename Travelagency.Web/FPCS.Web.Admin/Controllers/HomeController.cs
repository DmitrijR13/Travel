using System;
using System.Web.Mvc;
using System.Linq;
using FPCS.Web.Admin.Code;
using FPCS.Data.Enums;
using FPCS.Web.Admin.Models.Home;
using FPCS.Data;
using FPCS.Data.Repo;

namespace FPCS.Web.Admin.Controllers
{
	[FPCSAuthorize()]
	public class HomeController : BaseController
	{
		public ActionResult Index()
		{
			if (User.Role == Role.Admin)
			{
				return RedirectToAction("Index", "Student");
			}

			return View();
		}

		
	}
}
