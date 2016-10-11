using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Core.Unity;

namespace FPCS.Web.Admin.Models.Worker
{
    public class WorkerIndexModel
    {
        public Int64 WorkerId { get; set; }

        public String FIO { get; set; }

        public String Phones { get; set; }

        public String Job { get; set; }

        public String Email { get; set; }

        public String DateStart { get; set; }

        public String DateFinish { get; set; }

        public void Init()
        {
            using (var uow = UnityManager.Instance.Resolve<IUnitOfWork>())
            {
                var repoWorker = uow.GetRepo<IWorkerRepo>();

                var workers = repoWorker.GetAll()
                    .Select(x => new
                    {
                        WorkerId = x.WorkerId,
                        FIO = x.FIO,
                        Phones = x.Phone + (x.CellPhone != "" ? "(" + x.CellPhone + ")" : ""),
                        Job = x.Job,
                        Email = x.Email,
                        DateStart = x.DateStart.ToString("dd.MM.yyyy"),
                        DateFinish = x.DateFinish.HasValue ? x.DateFinish.Value.ToString("dd.MM.yyyy") : String.Empty
                    })
                    .ToList();
            }
        }
    }
}