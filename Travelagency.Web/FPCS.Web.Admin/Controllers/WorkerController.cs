using FPCS.Core.jqGrid;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.Worker;
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
    public class WorkerController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult _Index(GridOptions options, WorkerListOptions workerListOptions)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var worker = GetData(uow, options, workerListOptions);
                Int32 totalCount = worker.Count();

                var engine = new GridDynamicEngine(options, workerListOptions);
                var result = engine.CreateGridResult2(engine.ApplyPaging(worker.AsQueryable()), totalCount, x => new WorkerIndexModel
                {
                    WorkerId = x.WorkerId,
                    FIO = x.FIO,
                    Phones = x.Phones,
                    Job = x.Job,
                    Email = x.Email,
                    DateStart = x.DateStart,
                    DateFinish = x.DateFinish,
                });

                return Json(result);
            }
        }


        private List<WorkerIndexModel> GetData(IUnitOfWork uow, GridOptions options, WorkerListOptions workerListOptions)
        {
            var repo = uow.GetRepo<IWorkerRepo>();
           
            var dbList = repo.GetAll()
                 .Select(x => new
                {
                    WorkerId = x.WorkerId,
                    FIO = x.FIO,
                    Phones = x.Phone + (x.CellPhone != "" ? "(" + x.CellPhone + ")" : ""),
                    Job = x.Job,
                    Email = x.Email,
                    DateStart = x.DateStart,
                    DateFinish = x.DateFinish
                })
                                .ToList();

            var engine = new GridDynamicEngine(options, workerListOptions);
            var result = engine.ApplySort(engine.ApplyFilter(dbList.AsQueryable())).Select(x => new WorkerIndexModel
            {
                WorkerId = x.WorkerId,
                FIO = x.FIO,
                Phones = x.Phones,
                Job = x.Job,
                Email = x.Email,
                DateStart = x.DateStart.ToString("dd/MM/yyyy"),
                DateFinish = x.DateFinish.HasValue ? x.DateFinish.Value.ToString("dd/MM/yyyy") : String.Empty,
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
                    var repo = uow.GetRepo<IWorkerRepo>();
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
                    var repo = uow.GetRepo<IWorkerRepo>();
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
            var model = new WorkerCreateModel();
           
            return PartialView(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _Create(WorkerCreateModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IWorkerRepo>();

                        var dbEntity = repo.Add(model.FIO, model.CellPhone, model.Phone, model.Job, model.Email, model.DateStart, model.DateFinish);

                        uow.Commit();
                      
                        return JsonRes(dbEntity.WorkerId.ToString());
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
                var dbEntity = uow.GetRepo<IWorkerRepo>().Get(id);
                if (dbEntity == null) return ErrorPartial("Сотрудник {0} не найден", id);


                var model = new WorkerEditModel
                {
                    WorkerId = dbEntity.WorkerId,
                    CellPhone = dbEntity.CellPhone,
                    DateStart = dbEntity.DateStart,
                    DateFinish = dbEntity.DateFinish,
                    Email = dbEntity.Email,
                    Job = dbEntity.Job,
                    FIO = dbEntity.FIO,
                    Phone = dbEntity.Phone
               };
             return PartialView(model);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _Edit(WorkerEditModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IWorkerRepo>();

                        var dbEntity = repo.Get(model.WorkerId);
                        if (dbEntity == null) throw new NotFoundEntityException("Сотрудник не найден");

                        dbEntity.CellPhone = model.CellPhone.Trim();
                        dbEntity.DateStart = model.DateStart;
                        dbEntity.DateFinish = model.DateFinish;
                        dbEntity.Email = model.Email.Trim();
                        dbEntity.Job = model.Job.Trim();
                        dbEntity.FIO = model.FIO;
                        dbEntity.Phone = model.Phone;
                        dbEntity.UpdatedDate = DateTime.Now;

                        repo.Update(dbEntity);

                        uow.Commit();

                        return JsonRes(new { PersonId = dbEntity.WorkerId, FullName = dbEntity.FIO});
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