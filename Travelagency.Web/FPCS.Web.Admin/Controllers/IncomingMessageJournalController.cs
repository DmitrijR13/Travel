using FPCS.Core.jqGrid;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.IncomingMessageJournal;
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
    public class IncomingMessageJournalController : BaseController
    {
        public ActionResult Index()
        {
            IncomingMessageJournalIndexModel model = new IncomingMessageJournalIndexModel();
            model.IncomingSources = String.Join(@";", FPCS.Data.Enums.IncomingSource.Email.ToSelectListUsingDesc().Select(x => String.Format(@"{0}: {1}", x.Value, x.Text)));
            model.SourceInfos = String.Join(@";", FPCS.Data.Enums.SourceInfo.Advertisement.ToSelectListUsingDesc().Select(x => String.Format(@"{0}: {1}", x.Value, x.Text)));
            return View(model);
        }

        public JsonResult _Index(GridOptions options, IncomingMessageJournalListOptions incomingMessageJournalListOptions)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var incomingMessageJournal = GetData(uow, options, incomingMessageJournalListOptions);
                Int32 totalCount = incomingMessageJournal.Count();

                var engine = new GridDynamicEngine(options, incomingMessageJournal);
                var result = engine.CreateGridResult2(engine.ApplyPaging(incomingMessageJournal.AsQueryable()), totalCount, x => new IncomingMessageJournalIndexModel
                {
                    IncomingMessageJournalId = x.IncomingMessageJournalId,
                    Date = x.Date,
                    Fio = x.Fio,
                    Phones = x.Phones,
                    RequestContent = x.RequestContent,
                    AcceptedByWorkerFio = x.AcceptedByWorkerFio,
                    ResponsibleWorkerFio = x.ResponsibleWorkerFio,
                    IncomingSource = x.IncomingSource,
                    Result = x.Result,
                    SourceInfo = x.SourceInfo
                });

                return Json(result);
            }
        }


        private List<IncomingMessageJournalIndexModel> GetData(IUnitOfWork uow, GridOptions options, IncomingMessageJournalListOptions incomingMessageJournalListOptions)
        {
            var repo = uow.GetRepo<IIncomingMessageJournalRepo>();
            var incomingSource = incomingMessageJournalListOptions.IncomingSource;
            var sourceInfo = incomingMessageJournalListOptions.SourceInfo;

            var dbList = repo.GetAll()
                .Where(x => ((incomingSource.HasValue && x.IncomingSource == incomingSource.Value) || !incomingSource.HasValue)
                    && ((sourceInfo.HasValue && x.SourceInfo == sourceInfo.Value) || !sourceInfo.HasValue))
                 .Select(x => new
                {
                    IncomingMessageJournalId = x.IncomingMessageJournalId,
                    Date = x.Date,
                    Fio = x.Person.FIO,
                    Phones  = x.Person.Phone + (x.Person.CellPhone != "" ? "(" + x.Person.CellPhone + ")" : ""),
                    RequestContent = x.RequestContent,
                    AcceptedByWorkerFio = x.AcceptedBy.FIO,
                    ResponsibleWorkerFio = x.Responsible.FIO,
                    IncomingSource = x.IncomingSource,
                    Result  = x.Result,
                    SourceInfo = x.SourceInfo
                })
                 .ToList();

            var engine = new GridDynamicEngine(options, incomingMessageJournalListOptions);
            var result = engine.ApplySort(engine.ApplyFilter(dbList.AsQueryable())).Select(x => new IncomingMessageJournalIndexModel
            {
                IncomingMessageJournalId = x.IncomingMessageJournalId,
                Date = x.Date.ToString("dd.MM.yyyy"),
                Fio = x.Fio,
                Phones = x.Phones,
                RequestContent = x.RequestContent,
                AcceptedByWorkerFio = x.AcceptedByWorkerFio,
                ResponsibleWorkerFio = x.ResponsibleWorkerFio,
                IncomingSource = x.IncomingSource.GetDescription(),
                Result = x.Result,
                SourceInfo = x.SourceInfo.GetDescription()
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
                    var repo = uow.GetRepo<IIncomingMessageJournalRepo>();
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
                    var repo = uow.GetRepo<IIncomingMessageJournalRepo>();
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

        //[HttpGet]
        //public PartialViewResult _Create()
        //{
        //    var model = new PromotionActionCreateModel();
        //    model.Init();
        //    return PartialView(model);
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult _Create(PromotionActionCreateModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            using (var uow = UnityManager.Resolve<IUnitOfWork>())
        //            {
        //                var repo = uow.GetRepo<IPromotionActionRepo>();

        //                var dbEntity = repo.Add(model.Name, model.DateStart, model.DateFinish, model.PrAction);

        //                uow.Commit();
                      
        //                return JsonRes(dbEntity.PromotionActionId.ToString());
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            ModelState.AddModelError("", ex.Message);
        //        }
        //    }
           
        //    return PartialView(model);
        //}

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


        //[HttpGet]
        //public PartialViewResult _Edit(Int64 id)
        //{
        //    using (var uow = UnityManager.Resolve<IUnitOfWork>())
        //    {
        //        var dbEntity = uow.GetRepo<IPromotionActionRepo>().Get(id);
        //        if (dbEntity == null) return ErrorPartial("Рекламная акция {0} не найдена", id);


        //        var model = new PromotionActionEditModel
        //        {
        //            PromotionActionId = dbEntity.PromotionActionId,
        //            Name = dbEntity.Name,
        //            DateStart = dbEntity.DateStart,
        //            DateFinish = dbEntity.DateFinish,
        //            PrAction = dbEntity.PrAction
        //        };
        //     return PartialView(model);
        //    }
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult _Edit(PromotionActionEditModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            using (var uow = UnityManager.Resolve<IUnitOfWork>())
        //            {
        //                var repo = uow.GetRepo<IPromotionActionRepo>();

        //                var dbEntity = repo.Get(model.PromotionActionId);
        //                if (dbEntity == null) throw new NotFoundEntityException("Рекламная акция не найдена");

        //                dbEntity.DateFinish = model.DateFinish;
        //                dbEntity.DateStart = model.DateStart;
        //                dbEntity.Name = model.Name;
        //                dbEntity.PrAction = model.PrAction;
        //                dbEntity.UpdatedDate = DateTime.Now;

        //                repo.Update(dbEntity);

        //                uow.Commit();

        //                return JsonRes(new { PersonId = dbEntity.PromotionActionId});
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            ModelState.AddModelError("", ex.Message);
        //        }
        //    }

        //    return PartialView(model);
        //}
    }
}