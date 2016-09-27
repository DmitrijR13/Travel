using FPCS.Core.Attributes;
using System;
using System.ComponentModel;
using System.Linq;
using System.Web.Mvc;

namespace FPCS.Core.Extensions
{
    public static class EnumExtensions
    {
        public static SelectList ToSelectList<TEnum>(this TEnum enumObj)
            where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            var values = from TEnum e in Enum.GetValues(typeof(TEnum))
                         select new { Id = e, Name = e.ToString() };
            return new SelectList(values, "Id", "Name", enumObj);
        }

        public static SelectList ToSelectListUsingDesc<TEnum>(this TEnum enumObj)
            where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            var values = from TEnum e in Enum.GetValues(typeof(TEnum))
                         select new { Id = e, Name = e.GetDescription() };
            return new SelectList(values, "Id", "Name", enumObj);
        }

        public static SelectList ToSelectListUsingDescFromIds<TEnum>(this TEnum enumObj)
            where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            var values = from TEnum e in Enum.GetValues(typeof(TEnum))
                         select new { Id = Convert.ToInt32(e), Name = e.GetDescription() };
            return new SelectList(values, "Id", "Name", enumObj);
        }

        public static SelectList ToSelectListUsingDescWithoutActive<TEnum>(this TEnum enumObj)
            where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            var values = from TEnum e in Enum.GetValues(typeof(TEnum))
                         select new { Id = e, Name = e.GetDescription() };
            return new SelectList(values, "Id", "Name");
        }

        public static SelectList ToSelectListUsingDescWithNull<TEnum>(this TEnum enumObj)
            where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            var values = from TEnum e in Enum.GetValues(typeof(TEnum))
                         select new { Id = Convert.ToInt32(e), Name = e.GetDescription() };

            var tres = values.ToList();
            tres.Add(new { Id = 0, Name = "" });

            return new SelectList(tres.OrderBy(x => x.Id), "Id", "Name");
        }

        public static SelectList ToSelectListUsingDescActiveWithNull<TEnum>(this TEnum enumObj)
            where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            var values = from TEnum e in Enum.GetValues(typeof(TEnum))
                         select new { Id = Convert.ToInt32(e), Name = e.GetDescription() };

            var tres = values.ToList();
            tres.Add(new { Id = 0, Name = "" });

            return new SelectList(tres.OrderBy(x => x.Id), "Id", "Name", enumObj);
        }

        public static string GetDescription<TEnum>(this TEnum enumObj)
            where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            var t = typeof(TEnum).GetField(enumObj.ToString());

            if (t == null) { return String.Empty; }

            object[] attribs = typeof(TEnum).GetField(enumObj.ToString())
                .GetCustomAttributes(typeof(DescriptionAttribute), false);

            if (attribs != null && attribs.Length > 0)
                return ((DescriptionAttribute)attribs[attribs.Length - 1]).Description;

            return enumObj.ToString();
        }

        public static string GetDescription2Main<TEnum>(this TEnum enumObj)
            where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            var t = typeof(TEnum).GetField(enumObj.ToString());

            if (t == null) { return String.Empty; }

            object[] attribs = typeof(TEnum).GetField(enumObj.ToString())
                .GetCustomAttributes(typeof(DescriptionAttribute2), false);

            if (attribs != null && attribs.Length > 0)
                return ((DescriptionAttribute2)attribs[attribs.Length - 1]).Description;

            return enumObj.ToString();
        }

        public static string GetDescription2Additional<TEnum>(this TEnum enumObj)
            where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            var t = typeof(TEnum).GetField(enumObj.ToString());

            if (t == null) { return String.Empty; }

            object[] attribs = typeof(TEnum).GetField(enumObj.ToString())
                .GetCustomAttributes(typeof(DescriptionAttribute2), false);

            if (attribs != null && attribs.Length > 0)
                return ((DescriptionAttribute2)attribs[attribs.Length - 1]).Description2;

            return enumObj.ToString();
        }
    }
}
