using System;
using System.Linq;
using System.Linq.Expressions;

namespace FPCS.Core.jqGrid
{
    public interface IGridEngine
    {
        GridResult<T> ApplyAll<T>(IQueryable<T> query) where T : class;
        GridResult<TResult> ApplyAll<TSource, TResult>(IQueryable<TSource> query, Expression<Func<TSource, TResult>> convertFunc)
            where TSource : class
            where TResult : class;
        IQueryable<T> ApplyFilter<T>(IQueryable<T> query) where T : class;
        IQueryable<T> ApplyPaging<T>(IQueryable<T> query) where T : class;
        IQueryable<T> ApplySort<T>(IQueryable<T> query) where T : class;
        IQueryable<T> ApplySortAndPaging<T>(IQueryable<T> query) where T : class;
        GridResult<T> CreateGridResult<T>(IQueryable<T> query, int totalCount) where T : class;
        GridResult<TResult> CreateGridResult<TSource, TResult>(IQueryable<TSource> query, int totalCount, Expression<Func<TSource, TResult>> convertFunc)
            where TSource : class
            where TResult : class;
        GridOptions GridOptions { get; }
        Object ObjectOptions { get; }
    }
}
