using FPCS.Core.jqGrid;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.Fiz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Core.Extensions;
using FPCS.Core;
using FPCS.Web.Admin.Models.Person;
using FPCS.Web.Admin.Models.Email;

namespace FPCS.Web.Admin.Controllers
{
    public class DictionaryController : BaseController
    {
        public ActionResult Info(Int64 personId)
        {
            PersonInfoModel model = new PersonInfoModel();
            model.PersonId = personId;
            return View(model);
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Detail(GridOptions options, FizListOptions fizListOptions, Int64 personId)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var repo = uow.GetRepo<IEmailInfoRepo>();
                var personEmails = repo.GetEmailByPersonId(personId).ToList();
                Int32 totalCount = personEmails.Count();

                var engine = new GridDynamicEngine(options, fizListOptions);
                var result = engine.CreateGridResult2(engine.ApplyPaging(personEmails.AsQueryable()), totalCount, x => new EmailIndexModel
                {
                    Theme = x.EmailLetter.Theme,
                    Body = x.EmailLetter.Body,
                    EmailLetterId = x.EmailLetter.EmailLetterId,
                    CreateDate = x.EmailLetter.CreatedDate.ToString("dd.MM.yyyy")
                });

                return Json(result);
            }
        }
    }
}