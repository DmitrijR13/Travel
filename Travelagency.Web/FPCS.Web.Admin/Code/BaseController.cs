using System;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using FPCS.Core.Unity;
using FPCS.Web.Admin.Models.SessionModels;

namespace FPCS.Web.Admin.Code
{
	public class BaseController : Controller
	{
		public UnityManager UnityManager
		{
			get { return UnityManager.Instance; }
		}

		public new SessionUserModel User
		{
			get { return this.HttpContext.Session.GetUser(); }
		}

		
		protected JsonResult JsonRes()
		{
			return JsonRes(Status.OK, "OK", null, JsonRequestBehavior.DenyGet);
		}

		protected JsonResult JsonRes(Object obj)
		{
			return JsonRes(Status.OK, "OK", obj, JsonRequestBehavior.DenyGet);
		}

		protected JsonResult JsonRes(Status status, String message)
		{
			return JsonRes(status, message, null, JsonRequestBehavior.DenyGet);
		}

		protected JsonResult JsonRes(Status status, String message, Object obj)
		{
			return JsonRes(status, message, obj, JsonRequestBehavior.DenyGet);
		}

		protected JsonResult JsonRes(Status status, String message, Object obj, JsonRequestBehavior behavior)
		{
			return JsonRes(status, message, new JavaScriptSerializer().Serialize(obj), JsonRequestBehavior.DenyGet);
		}

		protected JsonResult JsonRes(Status status, String message, String obj, JsonRequestBehavior behavior)
		{
			return base.Json(new
			{
				ErrorCode = status,
				Message = message,
				Obj = obj
			}, behavior);
		}

		protected enum Status
		{
			OK = 200,
			Error = 500,
			NoEnoughBudget = 800,
			TotalLess = 900
		}

		protected ActionResult Error(String format, params Object[] args)
		{
			return Error(String.Format(format, args));
		}

		protected ActionResult Error(String errorText)
		{
			return View("Error", model: errorText);
		}

		protected PartialViewResult ErrorPartial(String format, params Object[] args)
		{
			return ErrorPartial(String.Format(format, args));
		}

		protected PartialViewResult ErrorPartial(String errorText)
		{
			return PartialView("_ErrorPartial", model: errorText);
		}
	}
}