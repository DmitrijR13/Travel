using FPCS.Core.jqGrid;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.ExcursionType;
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
    public class ExcursionTypeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult _Index(GridOptions options, ExcursionTypeListOptions excursionTypeListOptions)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var excursionType = GetData(uow, options, excursionTypeListOptions);
                Int32 totalCount = excursionType.Count();

                var engine = new GridDynamicEngine(options, excursionTypeListOptions);
                var result = engine.CreateGridResult2(engine.ApplyPaging(excursionType.AsQueryable()), totalCount, x => new ExcursionTypeIndexModel
                {
                    ExcursionTypeId = x.ExcursionTypeId,
                    PathName = x.PathName,
                    Description = x.Description,
                    TimeFrom = x.TimeFrom,
                    TimeTo = x.TimeTo,
                    Price = x.Price
                });

                return Json(result);
            }
        }


        private List<ExcursionTypeIndexModel> GetData(IUnitOfWork uow, GridOptions options, ExcursionTypeListOptions excursionTypeListOptions)
        {
            var repo = uow.GetRepo<IExcursionTypeRepo>();
           
            var dbList = repo.GetAll()
                 .Select(x => new
                {
                    ExcursionTypeId = x.ExcursionTypeId,
                    PathName = x.PathName,
                    Description = x.Description,
                    TimeFrom = x.TimeFrom,
                    TimeTo = x.TimeTo,
                    Price = x.Price
                 })
                                .ToList();

            var engine = new GridDynamicEngine(options, excursionTypeListOptions);
            var result = engine.ApplySort(engine.ApplyFilter(dbList.AsQueryable())).Select(x => new ExcursionTypeIndexModel
            {
                ExcursionTypeId = x.ExcursionTypeId,
                PathName = x.PathName,
                Description = x.Description,
                TimeFrom = x.TimeFrom,
                TimeTo = x.TimeTo,
                Price = x.Price
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
                    var repo = uow.GetRepo<IExcursionTypeRepo>();
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
                    var repo = uow.GetRepo<IExcursionTypeRepo>();
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
            var model = new ExcursionTypeCreateModel();          
            return PartialView(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _Create(ExcursionTypeCreateModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IExcursionTypeRepo>();

                        var dbEntity = repo.Add(model.PathName, model.Description, model.TimeFrom, model.TimeTo, model.Price);

                        uow.Commit();
                      
                        return JsonRes(dbEntity.ExcursionTypeId.ToString());
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
                var dbEntity = uow.GetRepo<IExcursionTypeRepo>().Get(id);
                if (dbEntity == null) return ErrorPartial("Экскурсия {0} не найден", id);


                var model = new ExcursionTypeEditModel
                {
                    ExcursionTypeId = dbEntity.ExcursionTypeId,
                    PathName = dbEntity.PathName,
                    Description = dbEntity.Description,
                    TimeFrom = dbEntity.TimeFrom,
                    TimeTo = dbEntity.TimeTo,
                    Price = dbEntity.Price
                };
             return PartialView(model);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _Edit(ExcursionTypeEditModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IExcursionTypeRepo>();

                        var dbEntity = repo.Get(model.ExcursionTypeId);
                        if (dbEntity == null) throw new NotFoundEntityException("Экскурсия не найдена");

                        dbEntity.Description = model.Description.Trim();
                        dbEntity.PathName = model.PathName;
                        dbEntity.Price = model.Price;
                        dbEntity.TimeFrom = model.TimeFrom;
                        dbEntity.TimeTo = model.TimeTo;
                        dbEntity.UpdatedDate = DateTime.Now;

                        repo.Update(dbEntity);

                        uow.Commit();

                        return JsonRes(new { PersonId = dbEntity.ExcursionTypeId});
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