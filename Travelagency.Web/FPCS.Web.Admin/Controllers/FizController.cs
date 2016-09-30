using FPCS.Core.jqGrid;
using FPCS.Data;
using FPCS.Data.Repo;
using FPCS.Web.Admin.Code;
using FPCS.Web.Admin.Models.Fiz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FPCS.Web.Admin.Controllers
{
    public class FizController : BaseController
    {
        public ActionResult Index()
        {
            FizIndexModel model = new FizIndexModel();
            model.Init();
            return View(model);
        }

        public JsonResult _Index(GridOptions options)
        {
            /*using (var uow = UnityManager.Resolve<IUnitOfWork>())
            {
                var fiz = GetData(uow, options);
                Int32 totalCount = fiz.Count();

                var engine = new GridDynamicEngine(options, null);
                var result = engine.CreateGridResult2(engine.ApplyPaging(fiz.AsQueryable()), totalCount, x => new StudentMiniModel
                {
                    DbUserId = x.DbUserId,
                    FullName = x.FullName,
                    Email = x.Email,
                    Sex = x.Sex,
                    Grade = x.Grade,
                    ZangleID = x.ZangleID,
                    EnrollmentStatus = x.EnrollmentStatus,
                    EnrollmentDate = x.EnrollmentDate,
                    WithdrawalDate = x.WithdrawalDate,
                    IsLocked = x.IsLocked,
                    Guardians = x.Guardians,
                    Phone = x.Phone
                });

                return Json(result);
            }*/
            return Json(null);
        }


        private List<FizIndexModel> GetData(IUnitOfWork uow, GridOptions options)
        {
            var repo = uow.GetRepo<IFizRepo>();

            var dbList = repo.GetAllFiz()
                                .ToList();

            var engine = new GridDynamicEngine(options, null);
            var result = engine.ApplySort(engine.ApplyFilter(dbList.AsQueryable())).Select(x => new FizIndexModel
            {
                PersonId = x.PersonId,
                FIO = x.FIO,
                Phones = x.Phone + (x.CellPhone != "" ? "(" + x.CellPhone + ")" : ""),
                FieldOfActivity = x.FieldOfActivity,
                Email = x.Email,
                DateOfBirth = x.DateOfBirth,
                WayOfInform = x.WayOfInform
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
                    var repo = uow.GetRepo<IFizRepo>();
                    foreach (var item in ids)
                    {
                        try
                        {
                            repo.Remove(new Guid(item));
                        }
                        catch (Exception)
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
                    var repo = uow.GetRepo<IFizRepo>();
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
                        var repo = uow.GetRepo<IFizRepo>();

                        var dbEntity = repo.Add(model.FIO, model.CellPhone, model.Phone, model.FieldOfActivity, model.Email, model.WayOfInform, model.DateOfBirth);

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
    }
}