using System;
using System.Linq;
using System.Linq.Dynamic;
using System.Reflection;

namespace FPCS.Core.jqGrid
{
    public class GridDynamicEngine : GridEngineBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="gridOptions">Base grid options</param>
        /// <param name="objectOptions">Object options</param>
        public GridDynamicEngine(GridOptions gridOptions, Object objectOptions)
            : base(gridOptions, objectOptions)
        {
        }

        protected override IQueryable<T> ApplyFilter<T>(IQueryable<T> query, PropertyInfo prop, GridProperty attr, String name, Object value)
        {
            var exp = String.Format(GetFilterOperationExpression(attr.FilterOperation), name);
            query = query.Where(exp, value);
            return query;
        }

        protected override IQueryable<T> ApplySort<T>(IQueryable<T> query, PropertyInfo prop, GridProperty attr, String name)
        {
            var sortOrder = GridOptions.IsSortASC ? "Ascending" : "Descending";
            query = query.OrderBy(name + " " + sortOrder);
            return query;
        }

        private String GetFilterOperationExpression(FilterOperation operation)
        {
            switch (operation)
            {
                case FilterOperation.StartsWith:
                    return "{0}.StartsWith(@0)";
                case FilterOperation.Contains:
                    return "{0}.Contains(@0)";
                case FilterOperation.Equal:
                    return "{0}.Equals(@0)";
                case FilterOperation.Equal2:
                    return "{0} == @0";
                case FilterOperation.NotEqual:
                    return "";
                case FilterOperation.LessThan:
                    return "";
                case FilterOperation.LessThanOrEqual:
                    return "";
                case FilterOperation.GreaterThan:
                    return "";
                case FilterOperation.GreaterThanOrEqual:
                    return "";
                default:
                    return "";
            }
        }
    }
}
