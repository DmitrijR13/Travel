using System;
using System.Linq;
using System.Reflection;

namespace FPCS.Core.jqGrid
{
    /// <summary>
    /// Attribute for mapping view model property on db model property
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class GridProperty : System.Attribute
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="type">Extension method type</param>
        /// <param name="isUsed">Is extension method used for this property</param>
        public GridProperty(ExtensionType type, Boolean isUsed)
            : this(type, isUsed, null, FilterOperation.Equal)
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="type">Extension method type</param>
        /// <param name="isUsed">Is extension method used for this property</param>
        /// <param name="name">Name db model property</param>
        public GridProperty(ExtensionType type, Boolean isUsed, String name)
            : this(type, isUsed, name, FilterOperation.Equal)
        {
        }

        /// <summary>
        /// Constructor for filtration
        /// </summary>
        /// <param name="type">Extension method type</param>
        /// <param name="isUsed">Is extension method used for this property</param>
        public GridProperty(ExtensionType type, Boolean isUsed, FilterOperation filterOperation)
            : this(type, isUsed, null, filterOperation)
        {
        }

        /// <summary>
        /// Constructor for filtration
        /// </summary>
        /// <param name="type">Extension method type</param>
        /// <param name="isUsed">Is extension method used for this property</param>
        /// <param name="name">Name db model property</param>
        public GridProperty(ExtensionType type, Boolean isUsed, String name, FilterOperation filterOperation)
        {
            this.Type = type;
            this.IsUsed = isUsed;
            this.Name = name;
            this.FilterOperation = filterOperation;
        }

        /// <summary>
        /// Extension method type
        /// </summary>
        public ExtensionType Type { get; private set; }

        /// <summary>
        /// Is extension method used for this property
        /// </summary>
        public Boolean IsUsed { get; private set; }

        /// <summary>
        /// The operation for filtration. Used only for filter.
        /// </summary>
        public FilterOperation FilterOperation { get; private set; }

        /// <summary>
        /// Name db model property
        /// </summary>
        public String Name { get; private set; }

        /// <summary>
        /// Get attribute for property 
        /// </summary>
        /// <param name="propInfo">Property info</param>
        /// <param name="type">Extension method type</param>
        /// <returns></returns>
        public static GridProperty GetAttribute(PropertyInfo propInfo, ExtensionType type)
        {
            GridProperty[] attrs = (GridProperty[])propInfo.GetCustomAttributes(typeof(GridProperty), false);
            var attr = attrs.FirstOrDefault(x => x.Type == type);
            if (attr == null) attr = attrs.FirstOrDefault(x => x.Type == ExtensionType.All);
            return attr;
        }
    }

    /// <summary>
    /// Extensions types
    /// </summary>
    public enum ExtensionType
    {
        All = 1,
        Filter = 2,
        Sort = 3,
        Paging = 4
    }
}
