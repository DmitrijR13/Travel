using System;

using FPCS.Data.Entities;
using System.Linq;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo
{
    public interface IPersonRepo : IRepoBase<Person>
    {
        IQueryable<Person> GetAllFiz();

        Person Add(String fio, String cellPhone, String phone, String fieldOfActivity, String email, WayOfInform wayOfInform, DateTimeOffset? dateOfBirth, TypePerson typePerson);

        Person Update(Int64 personId, String fio, String cellPhone, String phone, String fieldOfActivity, String email, WayOfInform wayOfInform, DateTimeOffset? dateOfBirth);

        IQueryable<Person> GetEmailById(String ids);

        IQueryable<Person> GetPersonByType(TypePerson typePerson);

    }
}