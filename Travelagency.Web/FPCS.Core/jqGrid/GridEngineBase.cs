using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace FPCS.Core.jqGrid
{
    public abstract class GridEngineBase : IGridEngine
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="gridOptions">Base grid options</param>
        /// <param name="objectOptions">Object options</param>
        public GridEngineBase(GridOptions gridOptions, Object objectOptions)
        {
            GridOptions = gridOptions;
            ObjectOptions = objectOptions;
        }

        public GridOptions GridOptions { get; private set; }

        public Object ObjectOptions { get; private set; }

        #region public methods

        /// <summary>
        /// Apply filtering, sorting, paging and create GridResult from query
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <returns></returns>
        public GridResult<T> ApplyAll<T>(IQueryable<T> query) where T : class
        {
            var localQuery = query;

            localQuery = this.ApplyFilter(localQuery);

            Int32 totalCount = localQuery.Count();

            localQuery = this.ApplySortAndPaging(localQuery);

            return this.CreateGridResult(localQuery, totalCount);
        }

        /// <summary>
        /// Apply filtering, sorting, paging and create GridResult from query with function convertation
        /// </summary>
        /// <typeparam name="TSource"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="query"></param>
        /// <param name="convertFunc">Function convertation</param>
        /// <returns></returns>
        public GridResult<TResult> ApplyAll<TSource, TResult>(IQueryable<TSource> query, Expression<Func<TSource, TResult>> convertFunc)
            where TSource : class
            where TResult : class
        {
            var localQuery = query;

            localQuery = this.ApplyFilter(localQuery);

            Int32 totalCount = localQuery.Count();

            localQuery = this.ApplySortAndPaging(localQuery);

            return this.CreateGridResult(localQuery, totalCount, convertFunc);
        }

        /// <summary>
        /// Apply filtering, sorting, paging and create GridResult from query with function convertation
        /// </summary>
        /// <typeparam name="TSource"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="query"></param>
        /// <param name="convertFunc">Function convertation</param>
        /// <returns></returns>
        public GridResult<TResult> ApplyAll2<TSource, TResult>(IQueryable<TSource> query, Func<TSource, TResult> convertFunc)
            where TSource : class
            where TResult : class
        {
            var localQuery = query;

            localQuery = this.ApplyFilter(localQuery);

            Int32 totalCount = localQuery.Count();

            localQuery = this.ApplySortAndPaging(localQuery);

            return this.CreateGridResult2(localQuery, totalCount, convertFunc);
        }

        /// <summary>
        /// Apply filtering, sorting, paging and create GridResult from query with function convertation
        /// </summary>
        /// <typeparam name="TSource"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="query"></param>
        /// <param name="convertFunc">Function convertation</param>
        /// <returns></returns>
        public GridResult<TResult> ApplyAll3<TSource, TResult>(IQueryable<TSource> query, Func<TSource, TResult> convertFunc)
            where TSource : class
            where TResult : class
        {
            var localQuery = query;

            localQuery = this.ApplyFilter(localQuery);

            Int32 totalCount = localQuery.Count();

            var localQuery2 = this.ApplySortAndPaging(localQuery.ToList().Select(convertFunc).AsQueryable()).ToList();

            return this.CreateGridResult3(localQuery2, totalCount, x => x);
        }
        
        /// <summary>
        /// Apply filtering
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <returns></returns>
        public IQueryable<T> ApplyFilter<T>(IQueryable<T> query) where T : class
        {
            var localQuery = query;

            if (GridOptions.IsSearch)
            {
                foreach (var prop in ObjectOptions.GetType().GetProperties())
                {
                    var value = prop.GetValue(ObjectOptions, null);
                    if (value != null)
                    {
                        var attr = GridProperty.GetAttribute(prop, ExtensionType.Filter);
                        if (attr != null && attr.IsUsed)
                        {
                            String name = !String.IsNullOrEmpty(attr.Name) ? attr.Name : prop.Name;
                            
                            localQuery = this.ApplyFilter(localQuery, prop, attr, name, value);
                        }
                    }
                }
            }
            return localQuery;
        }

        /// <summary>
        /// Apply sorting
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <returns></returns>
        public IQueryable<T> ApplySort<T>(IQueryable<T> query) where T : class
        {
            var localQuery = query;

            if (!String.IsNullOrEmpty(GridOptions.SortColumn))
            {
                var prop = ObjectOptions.GetType().GetProperty(GridOptions.SortColumn);
                if (prop != null)
                {
                    localQuery = this.ApplySort(localQuery, prop);
                }
            }
            return localQuery;
        }

        /// <summary>
        /// Apply paging
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <returns></returns>
        public IQueryable<T> ApplyPaging<T>(IQueryable<T> query) where T : class
        {
            var localQuery = query;

            if (!String.IsNullOrEmpty(GridOptions.SortColumn))
            {
                var prop = ObjectOptions.GetType().GetProperty(GridOptions.SortColumn);
                if (prop != null)
                {
                    localQuery = this.ApplyPaging(localQuery, prop);
                }
            }
            return localQuery;
        }

        /// <summary>
        /// Apply sorting and paging
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <returns></returns>
        public IQueryable<T> ApplySortAndPaging<T>(IQueryable<T> query) where T : class
        {
            var localQuery = query;

            if (!String.IsNullOrEmpty(GridOptions.SortColumn))
            {
                var prop = ObjectOptions.GetType().GetProperty(GridOptions.SortColumn);
                if (prop != null)
                {
                    localQuery = this.ApplySort(localQuery, prop);
                    localQuery = this.ApplyPaging(localQuery, prop);
                }
            }

            return localQuery;
        }

        /// <summary>
        /// Create GridResult from query
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="totalCount">Object options</param>
        /// <returns></returns>
        public GridResult<T> CreateGridResult<T>(IQueryable<T> query, Int32 totalCount) where T : class
        {
            var result = new GridResult<T>(GridOptions, totalCount, query.ToList());
            return result;
        }

        /// <summary>
        /// Create GridResult from query
        /// </summary>
        /// <typeparam name="TSource"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="query"></param>
        /// <param name="totalCount">Object options</param>
        /// <param name="convertFunc">Function convertation</param>
        /// <returns></returns>
        public GridResult<TResult> CreateGridResult<TSource, TResult>(IQueryable<TSource> query, Int32 totalCount, Expression<Func<TSource, TResult>> convertFunc)
            where TSource : class
            where TResult : class
        {
            var result = new GridResult<TResult>(GridOptions, totalCount, query.Select(convertFunc).ToList());
            return result;
        }

        /// <summary>
        /// Create GridResult from query 2
        /// </summary>
        /// <typeparam name="TSource"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="query"></param>
        /// <param name="totalCount">Object options</param>
        /// <param name="convertFunc">Function convertation</param>
        /// <returns></returns>
        public GridResult<TResult> CreateGridResult2<TSource, TResult>(IQueryable<TSource> query, Int32 totalCount, Func<TSource, TResult> convertFunc)
            where TSource : class
            where TResult : class
        {
            var result = new GridResult<TResult>(GridOptions, totalCount, query.ToList().Select(convertFunc).ToList());
            return result;
        }

        /// <summary>
        /// Create GridResult from query 3
        /// </summary>
        /// <typeparam name="TSource"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="query"></param>
        /// <param name="totalCount">Object options</param>
        /// <param name="convertFunc">Function convertation</param>
        /// <returns></returns>
        public GridResult<TResult> CreateGridResult3<TSource, TResult>(List<TSource> query, Int32 totalCount, Func<TSource, TResult> convertFunc)
            where TSource : class
            where TResult : class
        {
            var result = new GridResult<TResult>(GridOptions, totalCount, query.Select(convertFunc).ToList());
            return result;
        }

        #endregion public methods

        #region protected methods

        protected abstract IQueryable<T> ApplyFilter<T>(IQueryable<T> query, PropertyInfo prop, GridProperty attr, String name, Object value) where T : class;

        protected abstract IQueryable<T> ApplySort<T>(IQueryable<T> query, PropertyInfo prop, GridProperty attr, String name) where T : class;

        #endregion protected methods

        #region private methods

        private IQueryable<T> ApplySort<T>(IQueryable<T> query, PropertyInfo prop) where T : class
        {
            GridProperty attr = GridProperty.GetAttribute(prop, ExtensionType.Sort);
            if (attr != null && attr.IsUsed)
            {
                String name = !String.IsNullOrEmpty(attr.Name) ? attr.Name : prop.Name;

                query = this.ApplySort(query, prop, attr, name);
            }
            return query;
        }

        private IQueryable<T> ApplyPaging<T>(IQueryable<T> query, PropertyInfo prop) where T : class
        {
            GridProperty attr = GridProperty.GetAttribute(prop, ExtensionType.Paging);
            if (attr == null || attr.IsUsed)
            {
                //The method 'Skip' is only supported for sorted input in LINQ to Entities. The method 'OrderBy' must be called before the method 'Skip'.
                query = query.Skip(GridOptions.PageSize * (GridOptions.PageIndex - 1)).Take(GridOptions.PageSize);
            }
            return query;
        }

        #endregion private methods
    }
}
