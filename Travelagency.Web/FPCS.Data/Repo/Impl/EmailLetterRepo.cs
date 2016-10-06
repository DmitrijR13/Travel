using System;
using System.Linq;

using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo.Impl
{
    internal class EmailLetterRepo : RepoBase<EmailLetter, StudentManagementContext>, IEmailLetterRepo
    {
        public EmailLetterRepo(UnitOfWork<StudentManagementContext> unitOfWork) : base(unitOfWork) { }

        #region override methods

        public override IQueryable<EmailLetter> GetAll()
        {
            return DbSet.Where(x => !x.IsDeleted/* && x.IsShow*/);
        }

        #endregion override methods

       
        public EmailLetter Add(String theme, String body)
        {
            var emailLetter =
                Add(
                new EmailLetter
                {
                    Body = body,
                    Theme = theme,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                });

            return emailLetter;
        }
    }
}
