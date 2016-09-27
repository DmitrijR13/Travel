using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FPCS.Web.Admin.Models.Home
{
    public class IndexGuardianModel
    {
        public List<StudentModel> Students { get; set; }

	  public Int64 FamilyId { get; set; }
    }
}