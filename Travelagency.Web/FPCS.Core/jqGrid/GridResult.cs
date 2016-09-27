using System;
using System.Collections.Generic;

namespace FPCS.Core.jqGrid
{
    public class GridResult<T> where T : class
    {
        public GridResult(GridOptions options, Int32 totalRecordsCount)
            :this(options, totalRecordsCount, new List<T>())
        {
        }

        public GridResult(GridOptions options, Int32 totalRecordsCount, List<T> rows)
            :this(options, totalRecordsCount, rows, null)
        {
        }

        public GridResult(GridOptions options, Int32 totalRecordsCount, List<T> rows, Object userData)
        {
            this.rows = rows;
            this.userData = userData;
            this.page = options.PageIndex;
            this.records = options.PageSize;
            this.totalRecordsCount = totalRecordsCount;
            this.total = (int)Math.Ceiling((double)totalRecordsCount / options.PageSize);
        }

        /// <summary>
        /// Page number
        /// </summary>
        public Int32 page { get; private set; }

        /// <summary>
        /// Recors count on page
        /// </summary>
        public Int32 records { get; private set; }

        /// <summary>
        /// Total pages
        /// </summary>
        public Int32 total { get; private set; }

        /// <summary>
        /// Total records count
        /// </summary>
        public Int32 totalRecordsCount { get; private set; }

        /// <summary>
        /// Result rows
        /// </summary>
        public List<T> rows { get; private set; }

        /// <summary>
        /// Additional data
        /// </summary>
        public Object userData { get; private set; }
    }
}
