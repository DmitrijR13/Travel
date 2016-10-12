using System;

using FPCS.Data.Entities;
using System.Linq;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo
{
    public interface IWorkerRepo : IRepoBase<Worker>
    {
       
        Worker Add(String fio, String cellPhone, String phone, String job, String email, DateTimeOffset dateStart, DateTimeOffset? datefinish);

        Worker Update(Int64 workerId, String fio, String cellPhone, String phone, String job, String email, DateTimeOffset dateStart, DateTimeOffset? datefinish);

    }
}