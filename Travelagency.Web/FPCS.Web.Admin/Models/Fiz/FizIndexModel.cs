using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Core.Unity;

namespace FPCS.Web.Admin.Models.Fiz
{
    public class FizIndexModel
    {
        public Int64 PersonId { get; set; }

        public String FIO { get; set; }

        public String Phones { get; set; }

        public String FieldOfActivity { get; set; }

        public String Email { get; set; }

        public String WayOfInform { get; set; }

        public String DateOfBirth { get; set; }

        public void Init()
        {
            using (var uow = UnityManager.Instance.Resolve<IUnitOfWork>())
            {
                var repoFiz = uow.GetRepo<IPersonRepo>();

                var fizPersons = repoFiz.GetPersonByType(TypePerson.FizPerson)
                    .Select(x => new
                    {
                        PersonId = x.PersonId,
                        FIO = x.FIO,
                        Phones = x.Phone + (x.CellPhone != "" ? "(" + x.CellPhone + ")" : ""),
                        FieldOfActivity = x.FieldOfActivity,
                        Email = x.Email,
                        WayOfInform = x.WayOfInform
                    })
                    .ToList();
            }
        }
    }
}