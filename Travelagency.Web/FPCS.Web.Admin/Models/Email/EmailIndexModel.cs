using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Core.Unity;

namespace FPCS.Web.Admin.Models.Email
{
    public class EmailIndexModel
    {
        public Int64 EmailLetterId { get; set; }

        public String Theme { get; set; }

        public String Body { get; set; }

        public String CreateDate { get; set; }


        public void Init()
        {
            using (var uow = UnityManager.Instance.Resolve<IUnitOfWork>())
            {
                var repoEmailLetter = uow.GetRepo<IEmailLetterRepo>();

                var emailLetters = repoEmailLetter.GetAll()
                    .Select(x => new
                    {
                        EmailLetterId = x.EmailLetterId,
                        Theme = x.Theme,
                        Body = x.Body,
                        CreateDate = x.CreatedDate.ToString("dd.MM.yyyy")
                    })
                    .ToList();
            }
        }
    }
}