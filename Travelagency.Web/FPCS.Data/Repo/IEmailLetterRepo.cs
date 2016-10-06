using System;

using FPCS.Data.Entities;
using System.Linq;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo
{
    public interface IEmailLetterRepo : IRepoBase<EmailLetter>
    {

        EmailLetter Add(String theme, String body);

    }
}