using System;

using FPCS.Data.Entities;
using System.Linq;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo
{
    public interface IExcursionTypeRepo : IRepoBase<ExcursionType>
    {
        ExcursionType Add(String pathName, String description, Time timeFrom, Time timeTo, Decimal price);

        ExcursionType Update(Int64 excursionTypeId, String pathName, String description, Time timeFrom, Time timeTo, Decimal price);
    }
}