using System;
using System.Linq;
using System.Data.Entity.Migrations;

using FPCS.Data.Entities;
using FPCS.Core.Unity;
using FPCS.Data.Repo;

namespace FPCS.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<StudentManagementContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(StudentManagementContext context)
        {
            UnityManager.Instance.RegisterAllUnitySetups();
            UpdateUsers(context);
            //UpdateServiceVendor(context);
        }


        private void UpdateUsers(StudentManagementContext context)
        {
            using (var uow = UnityManager.Instance.Resolve<IUnitOfWork>())
            {
                var repo = uow.GetRepo<IAdminRepo>();
                if (!repo.IsExistLogin("Admin"))
                {
                    repo.Add("Admin", "ActanonVerba", null, "admin", "admin", null);
                    uow.Commit();
                }
            }
        }
    }
}
