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
            container.RegisterType<IFizRepo, FizRepo>();

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<StudentManagementContext, Configuration>());

            return container;
        }
    }
}
