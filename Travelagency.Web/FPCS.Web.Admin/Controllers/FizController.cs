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

namespace FPCS.Web.Admin.Controllers
{
    public class FizController : BaseController
    {
        public ActionResult Index()
        {
            FizIndexModel model = new FizIndexModel();
            model.WayOfInform = String.Join(@";", FPCS.Data.Enums.WayOfInform.Email.ToSelectListUsingDesc().Select(x => String.Format(@"{0}: {1}", x.Value, x.Text)));
            model.TypeFiz = String.Join(@";", FPCS.Data.Enums.TypeFiz.Private.ToSelectListUsingDesc().Select(x => String.Format(@"{0}: {1}", x.Value, x.Text)));
            //model.Init();
            return View(model);
        }

        public JsonResult _Index(GridOptions options, FizListOptions fizListOptions)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var fiz = GetData(uow, options, fizListOptions);
                Int32 totalCount = fiz.Count();

                var engine = new GridDynamicEngine(options, fizListOptions);
                var result = engine.CreateGridResult2(engine.ApplyPaging(fiz.AsQueryable()), totalCount, x => new FizIndexModel
                {
                    DateOfBirth = x.DateOfBirth,
                    WayOfInform = x.WayOfInform,
                    Phones = x.Phones,
                    PersonId = x.PersonId,
                    Email = x.Email,
                    FieldOfActivity = x.FieldOfActivity,
                    FIO = x.FIO,
                    TypeFiz = x.TypeFiz
                });

                return Json(result);
            }
        }


        private List<FizIndexModel> GetData(IUnitOfWork uow, GridOptions options, FizListOptions fizListOptions)
        {
            var repo = uow.GetRepo<IPersonRepo>();
            var fltWayOfInform = fizListOptions.WayOfInform;
            var fltTypeFiz = fizListOptions.TypeFiz;

            var dbList = repo.GetPersonByType(TypePerson.FizPerson)
                .Where(x => (((fltWayOfInform.HasValue && x.WayOfInform == fltWayOfInform.Value) || !fltWayOfInform.HasValue ) && ((fltTypeFiz.HasValue && x.TypeFiz == fltTypeFiz.Value) || !fltTypeFiz.HasValue)))
                .Select(x => new
                {
                    PersonId = x.PersonId,
                    FIO = x.FIO,
                    Phones = x.Phone + (x.CellPhone != "" ? "(" + x.CellPhone + ")" : ""),
                    FieldOfActivity = x.FieldOfActivity,
                    Email = x.Email,
                    DateOfBirth = x.DateOfBirth,
                    WayOfInform = x.WayOfInform,
                    TypeFiz = x.TypeFiz
                })
                                .ToList();

            var engine = new GridDynamicEngine(options, fizListOptions);
            var result = engine.ApplySort(engine.ApplyFilter(dbList.AsQueryable())).Select(x => new FizIndexModel
            {
                PersonId = x.PersonId,
                FIO = x.FIO,
                Phones = x.Phones,
                FieldOfActivity = x.FieldOfActivity,
                Email = x.Email,
                DateOfBirth = x.DateOfBirth.HasValue ? x.DateOfBirth.Value.ToString("dd/MM/yyyy") : String.Empty,
                WayOfInform = x.WayOfInform.GetDescription(),
                TypeFiz = x.TypeFiz.GetDescription()
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
                    var repo = uow.GetRepo<IPersonRepo>();
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
        public ActionResult Delete(Int64 id)
        {
            try
            {
                using (var uow = UnityManager.Resolve<IUnitOfWork>())
                {
                    var repo = uow.GetRepo<IPersonRepo>();
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
            var model = new FizCreateModel();
            model.Init();
            return PartialView(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _Create(FizCreateModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IPersonRepo>();

                        var dbEntity = repo.Add(model.FIO, model.CellPhone, model.Phone, model.FieldOfActivity, model.Email, model.WayOfInform, model.DateOfBirth, TypePerson.FizPerson, model.TypeFiz);

                        uow.Commit();
                      
                        return JsonRes(dbEntity.PersonId.ToString());
                    }
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
            }
            model.Init();
            return PartialView(model);
        }

        [HttpGet]
        public ActionResult SendEmail(String[] ids)
        {
            var id = String.Join(",", ids);
            String emails = String.Empty;
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var repo = uow.GetRepo<IPersonRepo>();
                var dbEntity = repo.GetEmailById(id);
                emails = String.Join(",", dbEntity.Select(x => x.Email.Trim()));
            }
            var model = new FizSendEmailModel
            {
                Body = "",
                Theme = "",
                Emails = emails,
                PersonIds = id
            };
            return PartialView(model);
        }

        [HttpPost]
        public ActionResult SendEmail(FizSendEmailModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    EmailSender.Instance.Send(model.Emails, model.Theme, model.Body);
                    //кладем письмо в таблицу EmailLetter
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repoEmail = uow.GetRepo<IEmailLetterRepo>();
                        var entity = repoEmail.Add(model.Theme, model.Body);

                        var repoEmailInfo = uow.GetRepo<IEmailInfoRepo>();

                        String[] personIds = model.PersonIds.Split(',');
                        foreach (var id in personIds)
                        {
                            repoEmailInfo.Add(Convert.ToInt64(id), entity.EmailLetterId);
                        }
                        uow.Commit();
                    }
                    return JsonRes(Status.OK, "OK");

                }
                catch (Exception ex)
                {
                    return JsonRes(Status.Error, ex.Message);
                }
            }
            return PartialView(model);
        }


        [HttpGet]
        public PartialViewResult _Edit(Int64 id)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var dbEntity = uow.GetRepo<IPersonRepo>().Get(id);
                if (dbEntity == null) return ErrorPartial("Клиент {0} не найден", id);


                var model = new FizEditModel
                {
                    PersonId = dbEntity.PersonId,
                    CellPhone = dbEntity.CellPhone,
                    DateOfBirth = dbEntity.DateOfBirth,
                    Email = dbEntity.Email,
                    FieldOfActivity = dbEntity.FieldOfActivity,
                    FIO = dbEntity.FIO,
                    Phone = dbEntity.Phone,
                    WayOfInform = dbEntity.WayOfInform,
                    TypeFiz = dbEntity.TypeFiz
                };

                model.Init();
                return PartialView(model);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _Edit(FizEditModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var uow = UnityManager.Resolve<IUnitOfWork>())
                    {
                        var repo = uow.GetRepo<IPersonRepo>();

                        Person dbEntity = repo.Get(model.PersonId);
                        if (dbEntity == null) throw new NotFoundEntityException("Клиент не найден");

                        dbEntity.CellPhone = model.CellPhone != null ? model.CellPhone.Trim() : String.Empty;
                        dbEntity.DateOfBirth = model.DateOfBirth.HasValue ? model.DateOfBirth.Value : new DateTimeOffset(1900,1,1,0,0,0, new TimeSpan());
                        dbEntity.Email = model.Email.Trim();
                        dbEntity.FieldOfActivity = model.FieldOfActivity != null ? model.FieldOfActivity.Trim() : String.Empty;
                        dbEntity.FIO = model.FIO;
                        dbEntity.Phone = model.Phone;
                        dbEntity.UpdatedDate = DateTime.Now;
                        dbEntity.WayOfInform = model.WayOfInform;
                        dbEntity.TypeFiz = model.TypeFiz;

                        repo.Update(dbEntity);

                        uow.Commit();

                        return JsonRes(new { PersonId = dbEntity.PersonId, FullName = dbEntity.FIO});
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