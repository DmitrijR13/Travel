using System;

using FPCS.Data.Entities;
using System.Linq;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo
{
    public interface IDbUserRepo : IRepoBase<DbUser>
    {
       
        IQueryable<DbUser> GetByRoles(params Role[] roles);

        DbUser Get(Guid id);

        Boolean IsExistLogin(String login);

        DbUser GetByLogin(String login);

        DbUser GetNotLockedByLogin(String login);

        DbUser GetByLoginAndPass(String login, String password);

        DbUser GetByEmail(String email);

        DbUser Update(Guid dbUserId, String email, String login, String password, Boolean isLocked);
    }
}
