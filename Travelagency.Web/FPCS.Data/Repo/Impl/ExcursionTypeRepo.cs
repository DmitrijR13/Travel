using System;
using System.Linq;

using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo.Impl
{
    internal class ExcursionTypeRepo : RepoBase<ExcursionType, StudentManagementContext>, IExcursionTypeRepo
    {
        public ExcursionTypeRepo(UnitOfWork<StudentManagementContext> unitOfWork) : base(unitOfWork) { }

        #region override methods

        public override IQueryable<ExcursionType> GetAll()
        {
            return DbSet.Where(x => !x.IsDeleted/* && x.IsShow*/);
        }

        #endregion override methods

        
        public ExcursionType Add(String pathName, String description, Time timeFrom, Time timeTo, Decimal price)
        {
            var excursionType =
                Add(
                new ExcursionType
                {
                    Description = description,
                    PathName = pathName,
                    Price = price,
                    TimeFrom = timeFrom,
                    TimeTo = timeTo,
                    UpdatedDate = DateTime.Now,
                    CreatedDate = DateTime.Now
                });

            return excursionType;
        }

        public ExcursionType Update(Int64 excursionTypeId, String pathName, String description, Time timeFrom, Time timeTo, Decimal price)
        {
            var excursionType = this.Get(excursionTypeId);
            if (excursionType == null) throw new NotFoundEntityException("Вид экскурсии не найден");

            excursionType.Description = description;
            excursionType.PathName = pathName;
            excursionType.TimeFrom = timeFrom;
            excursionType.TimeTo = timeTo;
            excursionType.Price = price;
            excursionType.UpdatedDate = DateTimeOffset.Now;

            return excursionType;
        }
    }
}
