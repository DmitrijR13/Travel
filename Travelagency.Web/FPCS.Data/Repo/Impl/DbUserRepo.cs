using System;
using System.Linq;

using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo.Impl
{
    internal class DbUserRepo : RepoBase<DbUser, StudentManagementContext>, IDbUserRepo
    {
        public DbUserRepo(UnitOfWork<StudentManagementContext> unitOfWork) : base(unitOfWork) { }

        #region override methods

        public override IQueryable<DbUser> GetAll()
        {
            return DbSet.Where(x => !x.IsDeleted/* && x.IsShow*/);
        }

        public override void Remove(DbUser entity)
        {
            entity.IsDeleted = true;
            entity.UpdatedDate = DateTimeOffset.Now;
        }

        #endregion override methods

        public IQueryable<DbUser> GetByRoles(params Role[] roles)
        {
            return GetAll().Where(x => roles.Contains(x.Role));
        }

        public DbUser Get(Guid Id)
        {
            return GetAll().FirstOrDefault(x => x.DbUserId == Id);
        }

        public Boolean IsExistLogin(String login)
        {
            return GetAll().Any(x => x.Login == login);
        }

        public DbUser GetByLogin(String login)
        {
            return GetAll().FirstOrDefault(x => x.Login == login);
        }

        public DbUser GetNotLockedByLogin(String login)
        {
            return GetAll().FirstOrDefault(x => !x.IsLocked && x.Login == login);
        }

        public DbUser GetByLoginAndPass(String login, String password)
        {
            DbUser dbUser = GetAll().FirstOrDefault(x => x.Login == login && x.Password == password);

            if (dbUser == null)
            {
                return null;               
            }
            else
            {
                return dbUser;
            }
        }

        public DbUser GetByEmail(String email)
        {
            return GetAll().FirstOrDefault(x => x.Email == email);
        }
        
        public DbUser Update(Guid dbUserId, String email, String login, String password, Boolean isLocked)
        {
            var dbEntity = Get(dbUserId);
            if (dbEntity == null) throw new NotFoundEntityException("User {0} not found", dbUserId);

            dbEntity.Email = email;
            dbEntity.Login = login;
            dbEntity.IsLocked = isLocked;
            if (!String.IsNullOrEmpty(password)) dbEntity.Password = password;
            dbEntity.UpdatedDate = DateTimeOffset.Now;

            return dbEntity;
        }
    }
}
