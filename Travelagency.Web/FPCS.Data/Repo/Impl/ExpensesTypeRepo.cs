using System;
using System.Linq;

using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo.Impl
{
    internal class ExpensesTypeRepo : RepoBase<ExpensesType, StudentManagementContext>, IExpensesTypeRepo
    {
        public ExpensesTypeRepo(UnitOfWork<StudentManagementContext> unitOfWork) : base(unitOfWork) { }

        #region override methods

        public override IQueryable<ExpensesType> GetAll()
        {
            return DbSet.Where(x => !x.IsDeleted/* && x.IsShow*/);
        }

        #endregion override methods

        
        public ExpensesType Add(String expensesName, String remark)
        {
            var expensesType =
                Add(
                new ExpensesType
                {
                    
                    ExpensesName = expensesName,
                    Remark = remark,
                    UpdatedDate = DateTime.Now,
                    CreatedDate = DateTime.Now
                });

            return expensesType;
        }

        public ExpensesType Update(Int64 expensesTypeId, String expensesName, String remark)
        {
            var expensesType = this.Get(expensesTypeId);
            if (expensesType == null) throw new NotFoundEntityException("Вид расходов не найден");

            expensesType.ExpensesName = expensesName;
            expensesType.Remark = remark;
            expensesType.UpdatedDate = DateTimeOffset.Now;

            return expensesType;
        }
    }
}
