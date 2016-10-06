using System;

using FPCS.Data.Entities;
using System.Linq;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo
{
    public interface IEmailInfoRepo : IRepoBase<EmailInfo>
    {
       
        EmailInfo Add(Int64 personId, Int64 emailLetterId);

        IQueryable<EmailInfo> GetEmailByPersonId(Int64 personId);

        IQueryable<EmailInfo> GetEmailByEmailLetterId(Int64 emailLetterId);

    }
}