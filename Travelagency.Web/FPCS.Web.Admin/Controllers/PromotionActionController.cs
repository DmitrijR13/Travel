using FPCS.Core.jqGrid;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.PromotionAction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Core.Extensions;
using FPCS.Core;

namespace FPCS.Web.Admin.Controllers
{
    public class PromotionActionController : BaseController
    {
        public ActionResult Index()
        {
            PromotionActionIndexModel model = new PromotionActionIndexModel();
            model.PrActions = String.Join(@";", FPCS.Data.Enums.PrAction.Internet.ToSelectListUsingDesc().Select(x => String.Format(@"{0}: {1}", x.Value, x.Text)));
            //model.Init();
            return View(model);
        }

        public JsonResult _Index(GridOptions options, PromotionActionListOptions promotionActionListOptions)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var promotionAction = GetData(uow, options, promotionActionListOptions);
                Int32 totalCount = promotionAction.Count();

                var engine = new GridDynamicEngine(options, promotionActionListOptions);
                var result = engine.CreateGridResult2(engine.ApplyPaging(promotionAction.AsQueryable()), totalCount, x => new PromotionActionIndexModel
                {
                    PromotionActionId = x.PromotionActionId,
                    Name = x.Name,
                    DateStart = x.DateStart,
                    DateFinish = x.DateFinish,
                    PrAction = x.PrAction
                });

                return Json(result);
            }
        }


        private List<PromotionActionIndexModel> GetData(IUnitOfWork uow, GridOptions options, PromotionActionListOptions promotionActionListOptions)
        {
            var repo = uow.GetRepo<IPromotionActionRepo>();
           
            var dbList = repo.GetAll()
                 .Select(x => new
                {
                     PromotionActionId = x.PromotionActionId,
                     Name = x.Name,
                     DateStart = x.DateStart,
                     DateFinish = x.DateFinish,
                     PrAction = x.PrAction
                 })
                                .ToList();

            var engine = new GridDynamicEngine(options, promotionActionListOptions);
            var result = engine.ApplySort(engine.ApplyFilter(dbList.AsQueryable())).Select(x => new PromotionActionIndexModel
            {
                PromotionActionId = x.PromotionActionId,
                Name = x.Name,
                DateStart = x.DateStart.ToString("dd/MM/yyyy"),
                DateFinish = x.DateFinish.ToString("dd/MM/yyyy"),
                PrAction = x.PrAction.GetDescription()
            })
            .ToList();

            return result;
        }

        [HttpPost]
        public ActionResult DeleteAll(String id)
        {
            try
            {
                if (String.IsNullOrEmpty(id)) return JsonRes(Status.Error, "Не выбраны записи для удаления");

                var ids = id.Split(',');
                using (var uow = UnityManager.Resolve<IUnitOfWork>())
                {
                    Int32 errorsCount = 0;
                    var repo = uow.GetRepo<IPromotionActionRepo>();
                    foreach (var item in ids)
                    {
                        try
                        {
                            repo.Remove(Convert.ToInt64(item));
                        }
                        catch (Exception ex)
                        {
                            errorsCount++;
                        }
                    }

                    uow.Commit();
                    if (errorsCount == 0) return JsonRes();
                    else return JsonRes(Status.Error, "Ошибка при удалении");
                }
            }
            catch (Exception ex)
            {
                return JsonRes(Status.Error, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Delete(Guid id)
        {
            try
            {
                using (var uow = UnityManager.Resolve<IUnitOfWork>())
                {
                    var repo = uow.GetRepo<IPromotionActionRepo>();
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

        [HttpGet]
        public PartialViewResult _Create()
        {
            var model = new PromotionActionCreateModel();
            model.Init();
            return PartialView(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _Create(PromotionActionCreateModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IPromotionActionRepo>();

                        var dbEntity = repo.Add(model.Name, model.DateStart, model.DateFinish, model.PrAction);

                        uow.Commit();
                      
                        return JsonRes(dbEntity.PromotionActionId.ToString());
                    }
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
            }
           
            return PartialView(model);
        }

        //[HttpGet]
        //public ActionResult SendEmail(String[] ids)
        //{
        //    var id = String.Join(",", ids);
        //    String emails = String.Empty;
        //    using (var uow = UnityManager.Resolve<IUnitOfWork>())
        //    {
        //        var repo = uow.GetRepo<IPersonRepo>();
        //        var dbEntity = repo.GetEmailById(id);
        //        emails = String.Join(",", dbEntity.Select(x => x.Email.Trim()));
        //    }
        //    var model = new FizSendEmailModel
        //    {
        //        Body = "",
        //        Theme = "",
        //        Emails = emails,
        //        PersonIds = id
        //    };
        //    return PartialView(model);
        //}

        //[HttpPost]
        //public ActionResult SendEmail(FizSendEmailModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            EmailSender.Instance.Send(model.Emails, model.Theme, model.Body);
        //            //кладем письмо в таблицу EmailLetter
        //            using (var uow = UnityManager.Resolve<IUnitOfWork>())
        //            {
        //                var repoEmail = uow.GetRepo<IEmailLetterRepo>();
        //                var entity = repoEmail.Add(model.Theme, model.Body);

        //                var repoEmailInfo = uow.GetRepo<IEmailInfoRepo>();

        //                String[] personIds = model.PersonIds.Split(',');
        //                foreach (var id in personIds)
        //                {
        //                    repoEmailInfo.Add(Convert.ToInt64(id), entity.EmailLetterId);
        //                }
        //                uow.Commit();
        //            }
        //            return JsonRes(Status.OK, "OK");

        //        }
        //        catch (Exception ex)
        //        {
        //            return JsonRes(Status.Error, ex.Message);
        //        }
        //    }
        //    return PartialView(model);
        //}


        [HttpGet]
        public PartialViewResult _Edit(Int64 id)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var dbEntity = uow.GetRepo<IPromotionActionRepo>().Get(id);
                if (dbEntity == null) return ErrorPartial("Рекламная акция {0} не найдена", id);


                var model = new PromotionActionEditModel
                {
                    PromotionActionId = dbEntity.PromotionActionId,
                    Name = dbEntity.Name,
                    DateStart = dbEntity.DateStart,
                    DateFinish = dbEntity.DateFinish,
                    PrAction = dbEntity.PrAction
                };
             return PartialView(model);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _Edit(PromotionActionEditModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IPromotionActionRepo>();

                        var dbEntity = repo.Get(model.PromotionActionId);
                        if (dbEntity == null) throw new NotFoundEntityException("Рекламная акция не найдена");

                        dbEntity.DateFinish = model.DateFinish;
                        dbEntity.DateStart = model.DateStart;
                        dbEntity.Name = model.Name;
                        dbEntity.PrAction = model.PrAction;
                        dbEntity.UpdatedDate = DateTime.Now;

                        repo.Update(dbEntity);

                        uow.Commit();

                        return JsonRes(new { PersonId = dbEntity.PromotionActionId});
                    }
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
            }

            return PartialView(model);
        }
    }
}