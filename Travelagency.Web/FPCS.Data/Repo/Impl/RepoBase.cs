using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace FPCS.Data.Repo.Impl
{
    internal abstract class RepoBase<TEntity, TDBContext> : IRepoBase<TEntity>
        where TDBContext : DbContext, new()
        where TEntity : class
    {
        #region public constructors

        public RepoBase(UnitOfWork<TDBContext> unitOfWork)
        {
            UnitOfWork = unitOfWork;
            Context = UnitOfWork.Context;
            DbSet = Context.Set<TEntity>();
        }

        #endregion public constructors

        #region public methods

        public virtual void ExecuteSql(String sql)
        {
            Context.Database.ExecuteSqlCommand(sql);
        }

        public virtual TEntity Get(Object Id)
        {
            return DbSet.Find(Id);
        }

        public virtual IQueryable<TEntity> Get(Expression<Func<TEntity, Boolean>> expression)
        {
            return GetAll().Where(expression);
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return DbSet;
        }

        public virtual TEntity Create()
        {
            return DbSet.Create<TEntity>();
        }

        public virtual TEntity Add(TEntity entity)
        {
            return DbSet.Add(entity);
        }

        public virtual TEntity Update(TEntity entity)
        {
            entity = DbSet.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public virtual void Remove(Object Id)
        {
            var entity = Get(Id);
            if (entity != null) Remove(entity);
        }

        public virtual void Remove(TEntity entity)
        {
            DbSet.Remove(entity);
        }

        public virtual void Remove(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                Remove(entity);
            }
        }

        public virtual Boolean IsExist(Expression<Func<TEntity, Boolean>> expression)
        {
            return GetAll().Any(expression);
        }

        public virtual Boolean IsUpdated(TEntity entity)
        {
            return Context.Entry(entity).State == EntityState.Modified;
        }

        #endregion public methods

        #region protected methods

        protected String GetKey()
        {
            return GetSimpleKey() + GetSimpleKey();
        }

        protected String GetSimpleKey()
        {
            return Guid.NewGuid().ToString();
        }

        #endregion protected methods

        #region protected properties

        protected UnitOfWork<TDBContext> UnitOfWork { get; private set; }
        protected TDBContext Context { get; private set; }
        protected IDbSet<TEntity> DbSet { get; private set; }

        #endregion protected properties
    }
}
