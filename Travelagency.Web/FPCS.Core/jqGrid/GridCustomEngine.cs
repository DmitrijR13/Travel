using System;
using System.Linq;
using System.Reflection;

using FPCS.Core.Extensions;

namespace FPCS.Core.jqGrid
{
    public class GridCustomEngine : GridEngineBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="gridOptions">Base grid options</param>
        /// <param name="objectOptions">Object options</param>
        public GridCustomEngine(GridOptions gridOptions, Object objectOptions)
            : base(gridOptions, objectOptions)
        {
        }

        protected override IQueryable<T> ApplyFilter<T>(IQueryable<T> query, PropertyInfo prop, GridProperty attr, String name, Object value)
        {
            query = query.Where(name, value, attr.FilterOperation);
            return query;
        }

        protected override IQueryable<T> ApplySort<T>(IQueryable<T> query, PropertyInfo prop, GridProperty attr, String name)
        {
            var sortOrder = GridOptions.IsSortASC ? "asc" : "desc";
            query = query.OrderBy(name, sortOrder);
            return query;
        }
    }
}
