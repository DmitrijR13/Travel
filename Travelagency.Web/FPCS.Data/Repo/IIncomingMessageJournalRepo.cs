using System;

using FPCS.Data.Entities;
using System.Linq;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo
{
    public interface IIncomingMessageJournalRepo : IRepoBase<IncomingMessageJournal>
    {
        IncomingMessageJournal Add(DateTimeOffset date, Int64 personId, String requestContent, Int64 acceptedById, 
            Int64 responsibleId, IncomingSource incomingSource, String result, SourceInfo sourceInfo);

        IncomingMessageJournal Update(Int64 incomingMessageJournalId, DateTimeOffset date, Int64 personId, String requestContent, Int64 acceptedById,
            Int64 responsibleId, IncomingSource incomingSource, String result, SourceInfo sourceInfo);

        IQueryable<IncomingMessageJournal> GetIncomingMessageJournalByPersonId(Int64 personId);

        IQueryable<IncomingMessageJournal> GetIncomingMessageJournalByAcceptedById(Int64 acceptedById);

        IQueryable<IncomingMessageJournal> GetIncomingMessageJournalByResponsibleId(Int64 responsibleId);

        IQueryable<IncomingMessageJournal> GetIncomingMessageJournalByIncomingSource(IncomingSource incomingSource);

        IQueryable<IncomingMessageJournal> GetIncomingMessageJournalBySourceInfo(SourceInfo sourceInfo);

        IQueryable<IncomingMessageJournal> GetIncomingMessageJournalByDate(DateTimeOffset dateFrom, DateTimeOffset dateTo);
    }
}