using System;

using FPCS.Data.Entities;
using System.Linq;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo
{
    public interface IFizRepo : IRepoBase<FisicalPerson>
    {
        IQueryable<FisicalPerson> GetAllFiz();

        FisicalPerson Add(String fio, String cellPhone, String phone, String fieldOfActivity, String email, WayOfInform wayOfInform, DateTimeOffset? dateOfBirth);

        FisicalPerson Update(Guid PersonId, String fio, String cellPhone, String phone, String fieldOfActivity, String email, WayOfInform wayOfInform, DateTimeOffset? dateOfBirth);
    }
}