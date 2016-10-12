using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using FPCS.Core.Unity;

namespace FPCS.Web.Admin.Models.ExcursionType
{
    public class ExcursionTypeIndexModel
    {
        public Int64 ExcursionTypeId { get; set; }

        public String PathName { get; set; }

        public String Description { get; set; }

        public String TimeFrom { get; set; }

        public String TimeTo { get; set; }

        public Decimal Price { get; set; }
    }
}