using System.Data.Entity;
using FPCS.Data.Migrations;
using Microsoft.Practices.Unity;

using FPCS.Core.Unity;
using FPCS.Data.Repo;
using FPCS.Data.Repo.Impl;

namespace FPCS.Data
{
    public class UnitySetup : IUnitySetup
    {
        public IUnityContainer RegisterTypes(IUnityContainer container)
        {
            container.RegisterType<IUnitOfWork, UnitOfWork<StudentManagementContext>>();

            container.RegisterType<IDbUserRepo, DbUserRepo>();
            container.RegisterType<IAdminRepo, AdminRepo>();
            container.RegisterType<IPersonRepo, PersonRepo>();
            container.RegisterType<IEmailInfoRepo, EmailInfoRepo>();
            container.RegisterType<IEmailLetterRepo, EmailLetterRepo>();
            container.RegisterType<IWorkerRepo, WorkerRepo>();
            container.RegisterType<IExcursionTypeRepo, ExcursionTypeRepo>();
            container.RegisterType<IExpensesTypeRepo, ExpensesTypeRepo>();
            container.RegisterType<IPromotionActionRepo, PromotionActionRepo>();

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<StudentManagementContext, Configuration>());

            return container;
        }
    }
}
