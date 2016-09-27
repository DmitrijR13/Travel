using System;

using FPCS.Data.Entities;

namespace FPCS.Data.Repo
{
    public interface IAdminRepo : IRepoBase<Admin>
    {
        Admin Get(Guid id);

        Boolean IsExistLogin(String login);

        Admin Add(String login, String password, String email, String firstName, String lastName, String middleInitial);
    }
}
