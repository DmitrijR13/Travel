using System;

using FPCS.Core.jqGrid;
using FPCS.Data.Enums;

namespace FPCS.Web.Admin.Models.Fiz
{
    public class FizListOptions
    {
        [GridProperty(ExtensionType.All, true)]
        public Guid? PersonId { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String FIO { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Email { get; set; }

        [GridProperty(ExtensionType.Filter, false)]
        public WayOfInform? WayOfInform { get; set; }

        [GridProperty(ExtensionType.Filter, false)]
        public TypeFiz? TypeFiz { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String Phones { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public String FieldOfActivity { get; set; }

        [GridProperty(ExtensionType.All, true, FilterOperation.Contains)]
        public DateTimeOffset? DateOfBirth { get; set; }
    }
}