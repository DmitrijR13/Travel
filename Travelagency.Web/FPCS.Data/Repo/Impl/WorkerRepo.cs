using System;
using System.Linq;

using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo.Impl
{
    internal class WorkerRepo : RepoBase<Worker, StudentManagementContext>, IWorkerRepo
    {
        public WorkerRepo(UnitOfWork<StudentManagementContext> unitOfWork) : base(unitOfWork) { }

        #region override methods

        public override IQueryable<Worker> GetAll()
        {
            return DbSet.Where(x => !x.IsDeleted/* && x.IsShow*/);
        }

        #endregion override methods

        
        public Worker Add(String fio, String cellPhone, String phone, String job, String email, DateTimeOffset dateStart, DateTimeOffset? datefinish)
        {
            var worker =
                Add(
                new Worker
                {
                    FIO = fio,
                    CellPhone = cellPhone,
                    DateStart = dateStart,
                    Email = email,
                    Job = job,
                    Phone = phone,
                  DateFinish = datefinish,
                    CreatedDate = DateTime.Now
                });

            return worker;
        }

        public Worker Update(Int64 workerId, String fio, String cellPhone, String phone, String job, String email, DateTimeOffset dateStart, DateTimeOffset? datefinish)
        {
            var worker = this.Get(workerId);
            if (worker == null) throw new NotFoundEntityException("Сотрудник не найден");

            worker.CellPhone = cellPhone;
            worker.DateStart = dateStart;
            worker.Email = email;
            worker.Job = job;
            worker.FIO = fio;
            worker.Phone = phone;
            worker.DateFinish = datefinish;
            worker.UpdatedDate = DateTimeOffset.Now;


            return worker;
        }
    }
}
