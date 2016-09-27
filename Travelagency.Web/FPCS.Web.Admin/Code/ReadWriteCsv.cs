using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace FPCS.Web.Admin.Code.ReadWriteCsv
{
    /// <summary>
    /// Class to store one CSV row
    /// </summary>
    public class CsvRow : List<String>
    {
        public String LineText { get; set; }
    }

    /// <summary>
    /// Class to write data to a CSV file
    /// </summary>
    public class CsvFileWriter
    {
        public CsvFileWriter()
        {
        }

        /// <summary>
        /// Writes a single row to a CSV file.
        /// </summary>
        /// <param name="row">The row to be written</param>
        public String WriteRow(CsvRow row)
        {
            StringBuilder builder = new StringBuilder();
            bool firstColumn = true;
            foreach (string value in row)
            {
                if (!firstColumn)
                    builder.Append(';');

                if (value != null &&
                    value.IndexOfAny(new Char[] { '"', ',' }) != -1)
                    builder.AppendFormat("\"{0}\"", value.Replace("\"", "\"\""));
                else
                    builder.Append(value);
                firstColumn = false;
            }

            row.LineText = builder.ToString();

            return row.LineText;
        }
    }
}