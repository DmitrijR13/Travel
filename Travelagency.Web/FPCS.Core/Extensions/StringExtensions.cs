using FPCS.Core.Attributes;
using System;
using System.ComponentModel;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;

namespace FPCS.Core.Extensions
{
    public static class StringExtensions
    {
        // This is the extension method.
        // The first parameter takes the "this" modifier
        // and specifies the type for which the method is defined.
        public static String TrimAndReduce(this String str)
        {
            if (!String.IsNullOrEmpty(str))
            {
                return ConvertWhitespacesToSingleSpaces(str).Trim();
            }
            else
            {
                return String.Empty;
            }
        }

        public static String ConvertWhitespacesToSingleSpaces(this String value)
        {
            return Regex.Replace(value, @"\s+", " ");
        }
    }
}
