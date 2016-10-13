using System;
using System.Linq;

using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo.Impl
{
    internal class IncomingMessageJournalRepo : RepoBase<IncomingMessageJournal, StudentManagementContext>, IIncomingMessageJournalRepo
    {
        public IncomingMessageJournalRepo(UnitOfWork<StudentManagementContext> unitOfWork) : base(unitOfWork) { }

        #region override methods

        public override IQueryable<IncomingMessageJournal> GetAll()
        {
            return DbSet.Where(x => !x.IsDeleted/* && x.IsShow*/);
        }

        #endregion override methods

        public IncomingMessageJournal Add(DateTimeOffset date, Int64 personId, String requestContent, Int64 acceptedById,
            Int64 responsibleId, IncomingSource incomingSource, String result, SourceInfo sourceInfo)
        {
            var incomingMessageJournal =
                Add(
                new IncomingMessageJournal
                {
                    AcceptedById = acceptedById,
                    IncomingSource = incomingSource,
                    Date = date,
                    PersonId = personId,
                    RequestContent = requestContent,
                    ResponsibleId = responsibleId,
                    Result = result,
                    SourceInfo = sourceInfo,
                    UpdatedDate = DateTime.Now,
                    CreatedDate = DateTime.Now
                });

            return incomingMessageJournal;
        }

        public IncomingMessageJournal Update(Int64 incomingMessageJournalId, DateTimeOffset date, Int64 personId, String requestContent, Int64 acceptedById,
            Int64 responsibleId, IncomingSource incomingSource, String result, SourceInfo sourceInfo)
        {
            var incomingMessageJournal = this.Get(incomingMessageJournalId);
            if (incomingMessageJournal == null) throw new NotFoundEntityException("Заявка не найдена");

            incomingMessageJournal.IncomingMessageJournalId = incomingMessageJournalId;
            incomingMessageJournal.Date = date;
            incomingMessageJournal.PersonId = personId;
            incomingMessageJournal.RequestContent = requestContent;
            incomingMessageJournal.AcceptedById = acceptedById;
            incomingMessageJournal.ResponsibleId = responsibleId;
            incomingMessageJournal.IncomingSource = incomingSource;
            incomingMessageJournal.Result = result;
            incomingMessageJournal.SourceInfo = sourceInfo;

            incomingMessageJournal.UpdatedDate = DateTimeOffset.Now;

            return incomingMessageJournal;
        }

        public IQueryable<IncomingMessageJournal> GetIncomingMessageJournalByPersonId(Int64 personId)
        {
            return GetAll()
                .Where(x => x.Person.PersonId == personId);
        }

        public IQueryable<IncomingMessageJournal> GetIncomingMessageJournalByAcceptedById(Int64 acceptedById)
        {
            return GetAll()
                .Where(x => x.AcceptedBy.WorkerId == acceptedById);
        }

        public IQueryable<IncomingMessageJournal> GetIncomingMessageJournalByResponsibleId(Int64 responsibleId)
        {
            return GetAll()
                .Where(x => x.AcceptedBy.WorkerId == responsibleId);
        }

        public IQueryable<IncomingMessageJournal> GetIncomingMessageJournalByIncomingSource(IncomingSource incomingSource)
        {
            return GetAll()
                .Where(x => x.IncomingSource == incomingSource);
        }

        public IQueryable<IncomingMessageJournal> GetIncomingMessageJournalBySourceInfo(SourceInfo sourceInfo)
        {
            return GetAll()
                .Where(x => x.SourceInfo == sourceInfo);
        }

        public IQueryable<IncomingMessageJournal> GetIncomingMessageJournalByDate(DateTimeOffset dateFrom, DateTimeOffset dateTo)
        {
            return GetAll()
                .Where(x => x.Date >= dateFrom && x.Date <= dateTo);
        }
    }
}
