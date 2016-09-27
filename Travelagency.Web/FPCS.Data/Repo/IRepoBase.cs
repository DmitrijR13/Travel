using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace FPCS.Data.Repo
{
    public interface IRepoBase<TEntity>
        where TEntity : class
    {
        void ExecuteSql(String sql);

        TEntity Get(Object Id);

        IQueryable<TEntity> Get(Expression<Func<TEntity, Boolean>> expression);

        IQueryable<TEntity> GetAll();

        TEntity Create();

        TEntity Add(TEntity entity);

        TEntity Update(TEntity entity);

        void Remove(Object Id);

        void Remove(TEntity entity);

        void Remove(IEnumerable<TEntity> entities);

        Boolean IsExist(Expression<Func<TEntity, Boolean>> expression);

        Boolean IsUpdated(TEntity entity);
    }
}
