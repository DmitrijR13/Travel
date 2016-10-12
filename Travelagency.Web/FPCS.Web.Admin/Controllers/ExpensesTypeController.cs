﻿using FPCS.Core.jqGrid;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.ExpensesType;
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
    public class ExpensesTypeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult _Index(GridOptions options, ExpensesTypeListOptions expensesTypeListOptions)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var expensesType = GetData(uow, options, expensesTypeListOptions);
                Int32 totalCount = expensesType.Count();

                var engine = new GridDynamicEngine(options, expensesTypeListOptions);
                var result = engine.CreateGridResult2(engine.ApplyPaging(expensesType.AsQueryable()), totalCount, x => new ExpensesTypeIndexModel
                {
                    ExpensesTypeId = x.ExpensesTypeId,
                    ExpensesName = x.ExpensesName,
                    Remark = x.Remark
                });

                return Json(result);
            }
        }


        private List<ExpensesTypeIndexModel> GetData(IUnitOfWork uow, GridOptions options, ExpensesTypeListOptions expensesTypeListOptions)
        {
            var repo = uow.GetRepo<IExpensesTypeRepo>();
           
            var dbList = repo.GetAll()
                 .Select(x => new
                {
                     ExpensesTypeId = x.ExpensesTypeId,
                     ExpensesName = x.ExpensesName,
                     Remark = x.Remark
                 })
                                .ToList();

            var engine = new GridDynamicEngine(options, expensesTypeListOptions);
            var result = engine.ApplySort(engine.ApplyFilter(dbList.AsQueryable())).Select(x => new ExpensesTypeIndexModel
            {
                ExpensesTypeId = x.ExpensesTypeId,
                ExpensesName = x.ExpensesName,
                Remark = x.Remark
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
                    var repo = uow.GetRepo<IExpensesTypeRepo>();
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
                    var repo = uow.GetRepo<IExpensesTypeRepo>();
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
            var model = new ExpensesTypeCreateModel();          
            return PartialView(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _Create(ExpensesTypeCreateModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IExpensesTypeRepo>();

                        var dbEntity = repo.Add(model.ExpensesName, model.Remark);

                        uow.Commit();
                      
                        return JsonRes(dbEntity.ExpensesTypeId.ToString());
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
                var dbEntity = uow.GetRepo<IExpensesTypeRepo>().Get(id);
                if (dbEntity == null) return ErrorPartial("Вид расходов {0} не найден", id);


                var model = new ExpensesTypeEditModel
                {
                    ExpensesTypeId = dbEntity.ExpensesTypeId,
                    ExpensesName = dbEntity.ExpensesName,
                    Remark = dbEntity.Remark
                };
             return PartialView(model);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _Edit(ExpensesTypeEditModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IExpensesTypeRepo>();

                        var dbEntity = repo.Get(model.ExpensesTypeId);
                        if (dbEntity == null) throw new NotFoundEntityException("Расход не найдена");

                        dbEntity.ExpensesName = model.ExpensesName.Trim();
                        dbEntity.Remark = model.Remark;
                        dbEntity.UpdatedDate = DateTime.Now;

                        repo.Update(dbEntity);

                        uow.Commit();

                        return JsonRes(new { PersonId = dbEntity.ExpensesTypeId});
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