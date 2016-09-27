using System;
using System.Web.Mvc;

namespace FPCS.Core.jqGrid
{
    /// <summary>
    /// Input data from jqGrid
    /// </summary>
    [ModelBinder(typeof(GridOptionsBinder))]
    public class GridOptions
    {
        /// <summary>
        /// If need to filter
        /// </summary>
        public Boolean IsSearch { get; set; }

        /// <summary>
        /// Page number
        /// </summary>
        public Int32 PageIndex { get; set; }

        /// <summary>
        /// Recors count on page
        /// </summary>
        public Int32 PageSize { get; set; }

        /// <summary>
        /// Sort column
        /// </summary>
        public String SortColumn { get; set; }

        /// <summary>
        /// Sort order ("asc", "desc")
        /// </summary>
        public Boolean IsSortASC { get; set; }

        public Int64 ND { get; set; }
    }
}
