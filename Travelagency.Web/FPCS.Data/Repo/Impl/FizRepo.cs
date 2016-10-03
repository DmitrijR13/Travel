using System;
using System.Linq;

using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo.Impl
{
    internal class FizRepo : RepoBase<FisicalPerson, StudentManagementContext>, IFizRepo
    {
        public FizRepo(UnitOfWork<StudentManagementContext> unitOfWork) : base(unitOfWork) { }

        #region override methods

        public override IQueryable<FisicalPerson> GetAll()
        {
            return DbSet.Where(x => !x.IsDeleted/* && x.IsShow*/);
        }

        #endregion override methods

        public IQueryable<FisicalPerson> GetAllFiz()
        {
            return GetAll().Where(x => x.IsDeleted == false);
        }

        public FisicalPerson Add(String fio, String cellPhone, String phone, String fieldOfActivity, String email, WayOfInform wayOfInform, DateTimeOffset? dateOfBirth)
        {
            var fisicalPerson =
                Add(
                new FisicalPerson
                {
                    FIO = fio,
                    CellPhone = cellPhone,
                    DateOfBirth = dateOfBirth,
                    Email = email,
                    FieldOfActivity = fieldOfActivity,
                    Phone = phone,
                    WayOfInform = wayOfInform
                });

            return fisicalPerson;
        }

        public FisicalPerson Update(Guid personId, String fio, String cellPhone, String phone, String fieldOfActivity, String email, WayOfInform wayOfInform, DateTimeOffset? dateOfBirth)
        {
            var fizPerson = this.Get(personId);
            if (fizPerson == null) throw new NotFoundEntityException("Клиент не найден");

            fizPerson.CellPhone = cellPhone;
            fizPerson.DateOfBirth = dateOfBirth;
            fizPerson.Email = email;
            fizPerson.FieldOfActivity = fieldOfActivity;
            fizPerson.FIO = fio;
            fizPerson.Phone = phone;
            fizPerson.WayOfInform = wayOfInform;
            fizPerson.UpdatedDate = DateTimeOffset.Now;


            return fizPerson;
        }
    }
}
