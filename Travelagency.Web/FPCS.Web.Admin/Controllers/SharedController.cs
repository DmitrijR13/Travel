using System;
using System.Web.Mvc;
using System.Web.Mvc.Html;

using FPCS.Data.Enums;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.Shared;

namespace FPCS.Web.Admin.Controllers
{
    public class SharedController : BaseController
    {
        public ActionResult _TopNavPartial()
        {
            var model = new TopNavModel();
            model.SessionUser = User;
            model.Init();
            return PartialView(model);
        }
    }
}
