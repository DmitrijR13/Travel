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
using FPCS.Web.Admin.Models.Person;

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

        public ActionResult EmailDetail(Int64 id)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var dbEntity = uow.GetRepo<IEmailLetterRepo>().Get(id);
                if (dbEntity == null) return ErrorPartial("Клиент {0} не найден", id);

                var model = new EmailIndexModel
                {
                    Theme = dbEntity.Theme,
                    Body = dbEntity.Body,
                    EmailLetterId = dbEntity.EmailLetterId
                };

                return View(model);
            }
        }

        [HttpPost]
        public JsonResult PersonDetail(GridOptions options, EmailInfoDetailListOption fizListOptions, Int64 emailLetterId)
        {
            using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var repo = uow.GetRepo<IEmailInfoRepo>();
                var emailLetters = repo.GetEmailByEmailLetterId(emailLetterId).ToList();
                Int32 totalCount = emailLetters.Count();

                var engine = new GridDynamicEngine(options, fizListOptions);
                var result = engine.CreateGridResult2(engine.ApplyPaging(emailLetters.AsQueryable()), totalCount, x => new PersonEmailDetailModel
                {
                    PersonId = x.Person.PersonId,
                    Email = x.Person.Email,
                    FIO = x.Person.FIO,
                    Phones = x.Person.Phone + (x.Person.CellPhone != "" ? "(" + x.Person.CellPhone + ")" : "")
                });

                return Json(result);
            }
        }
    }
}