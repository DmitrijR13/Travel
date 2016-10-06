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
using FPCS.Web.Admin.Models.Email;

namespace FPCS.Web.Admin.Controllers
{
    public class EmailController : BaseController
    {
        public ActionResult Index()
        {
            EmailIndexModel model = new EmailIndexModel();
           
            //model.Init();
            return View(model);
        }

        public JsonResult _Index(GridOptions options, EmailListOptions emailListOptions)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            { 
                var email = GetData(uow, options, emailListOptions);
                Int32 totalCount = email.Count();

                var engine = new GridDynamicEngine(options, emailListOptions);
                var result = engine.CreateGridResult2(engine.ApplyPaging(email.AsQueryable()), totalCount, x => new EmailIndexModel
                {
                    Theme = x.Theme,
                    CreateDate = x.CreateDate,
                    Body = x.Body,
                    EmailLetterId = x.EmailLetterId
                 });

                return Json(result);
            }
        }


        private List<EmailIndexModel> GetData(IUnitOfWork uow, GridOptions options, EmailListOptions emailListOptions)
        {
            var repo = uow.GetRepo<IEmailLetterRepo>();
           // var fltWayOfInform = fizListOptions.WayOfInform;

            var dbList = repo.GetAll()
                .Select(x => new
                {
                    EmailLetterId = x.EmailLetterId,
                    Theme = x.Theme,
                    Body = x.Body,
                    CreateDate = x.CreatedDate
                })
                .ToList();

            var engine = new GridDynamicEngine(options, emailListOptions);
            var result = engine.ApplySort(engine.ApplyFilter(dbList.AsQueryable())).Select(x => new EmailIndexModel
            {
                EmailLetterId = x.EmailLetterId,
                Theme = x.Theme,
                Body = x.Body,
                CreateDate = x.CreateDate.ToString("dd.MM.yyyy")
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
                    var repo = uow.GetRepo<IEmailLetterRepo>();
                    foreach (var item in ids)
                    {
                        var emailInfo = uow.GetRepo<IEmailInfoRepo>();
                        var entities = emailInfo.GetEmailByEmailLetterId(Convert.ToInt64(item));
                        foreach (var entity in entities)
                        {
                            try
                            {
                                emailInfo.Remove(entity.EmailInfoId);
                            }
                            catch (Exception ex)
                            {
                                errorsCount++;
                            }
                        }
                       
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

                        var dbEntity = repo.Add(model.FIO, model.CellPhone, model.Phone, model.FieldOfActivity, model.Email, model.WayOfInform, model.DateOfBirth, TypePerson.FizPerson);

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
                Emails = emails
            };
            return PartialView(model);
        }

        [HttpPost]
        public ActionResult SendEmail(FizSendEmailModel model)
        {
            if (ModelState.IsValid)
            {
                EmailSender.Instance.Send(model.Emails, model.Theme, model.Body);
                return JsonRes(Status.OK, "OK");
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
                    WayOfInform = dbEntity.WayOfInform
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

                        dbEntity.CellPhone = model.CellPhone.Trim();
                        dbEntity.DateOfBirth = model.DateOfBirth.HasValue ? model.DateOfBirth.Value : new DateTimeOffset(1900,1,1,0,0,0, new TimeSpan());
                        dbEntity.Email = model.Email.Trim();
                        dbEntity.FieldOfActivity = model.FieldOfActivity.Trim();
                        dbEntity.FIO = model.FIO;
                        dbEntity.Phone = model.Phone;
                        dbEntity.UpdatedDate = DateTime.Now;
                        dbEntity.WayOfInform = model.WayOfInform;

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