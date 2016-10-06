using System;
using System.Linq;

using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo.Impl
{
    internal class EmailInfoRepo : RepoBase<EmailInfo, StudentManagementContext>, IEmailInfoRepo
    {
        public EmailInfoRepo(UnitOfWork<StudentManagementContext> unitOfWork) : base(unitOfWork) { }

        #region override methods

        public override IQueryable<EmailInfo> GetAll()
        {
            return DbSet.Where(x => !x.IsDeleted/* && x.IsShow*/);
        }

        #endregion override methods

        public EmailInfo Add(Int64 personId, Int64 emailLetterId)
        {
            var emailInfo =
                Add(
                new EmailInfo
                {
                    PersonId = personId,
                    EmailLetterId = emailLetterId,
                    CreatedDate = DateTime.Now
                });

            return emailInfo;
        }

   

        public IQueryable<EmailInfo> GetEmailByPersonId(Int64 personId)
        {
            return GetAll()
                .Where(x => x.Person.PersonId == personId);
        }

        public IQueryable<EmailInfo> GetEmailByEmailLetterId(Int64 emailLetterId)
        {
            return GetAll()
                .Where(x => x.EmailLetter.EmailLetterId == emailLetterId);
        }
    }
}
