using System;

using FPCS.Data.Entities;
using System.Linq;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo
{
    public interface IExpensesTypeRepo : IRepoBase<ExpensesType>
    {
        ExpensesType Add(String expensesName, String remark);

        ExpensesType Update(Int64 expensesTypeId, String expensesName, String remark);
    }
}