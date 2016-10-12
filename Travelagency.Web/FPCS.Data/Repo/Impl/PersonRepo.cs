using System;
using System.Linq;

using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo.Impl
{
    internal class PersonRepo : RepoBase<Person, StudentManagementContext>, IPersonRepo
    {
        public PersonRepo(UnitOfWork<StudentManagementContext> unitOfWork) : base(unitOfWork) { }

        #region override methods

        public override IQueryable<Person> GetAll()
        {
            return DbSet.Where(x => !x.IsDeleted/* && x.IsShow*/);
        }

        #endregion override methods

        public IQueryable<Person> GetAllFiz()
        {
            return GetAll().Where(x => x.IsDeleted == false);
        }

        public Person Add(String fio, String cellPhone, String phone, String fieldOfActivity, String email, WayOfInform wayOfInform, DateTimeOffset? dateOfBirth, TypePerson typePerson)
        {
            var person =
                Add(
                new Person
                {
                    FIO = fio,
                    CellPhone = cellPhone,
                    DateOfBirth = dateOfBirth,
                    Email = email,
                    FieldOfActivity = fieldOfActivity,
                    Phone = phone,
                    WayOfInform = wayOfInform,
                    TypePerson = typePerson,
                    CreatedDate = DateTime.Now
                });

            return person;
        }

        public Person Update(Int64 personId, String fio, String cellPhone, String phone, String fieldOfActivity, String email, WayOfInform wayOfInform, DateTimeOffset? dateOfBirth)
        {
            var person = this.Get(personId);
            if (person == null) throw new NotFoundEntityException("Клиент не найден");

            person.CellPhone = cellPhone;
            person.DateOfBirth = dateOfBirth;
            person.Email = email;
            person.FieldOfActivity = fieldOfActivity;
            person.FIO = fio;
            person.Phone = phone;
            person.WayOfInform = wayOfInform;
            person.UpdatedDate = DateTimeOffset.Now;


            return person;
        }


        public IQueryable<Person> GetEmailById(String ids)
        {
            return GetAll()
                .Where(x => x.IsDeleted == false && (x.WayOfInform == WayOfInform.Email || x.WayOfInform == WayOfInform.Other) 
                    && !String.IsNullOrEmpty(x.Email) && ids.Contains(x.PersonId.ToString()));
        }

        public IQueryable<Person> GetPersonByType(TypePerson typePerson)
        {
            return GetAll()
                .Where(x => x.TypePerson == typePerson);
        }
    }
}
