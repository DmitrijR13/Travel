using System;

namespace FPCS.Data
{
    public interface IUnitOfWork : IDisposable
    {
        Int32 Commit();

        TRepo GetRepo<TRepo>();
    }
}
