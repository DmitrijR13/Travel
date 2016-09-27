using System;
using System.Linq;
using System.Collections.Generic;

using FPCS.Web.Admin.Models.SessionModels;
using FPCS.Core.Unity;
using FPCS.Data;
using FPCS.Data.Repo;
using System.Web.Mvc;

namespace FPCS.Web.Admin.Models.Shared
{
    public class TopNavModel
    {
        public SessionUserModel SessionUser { get; set; }

        public SessionSchoolYearModel SessionSchoolYear { get; set; }

        public IEnumerable<Lookup<Int32, String>> SchoolYears { get; set; }

        public void Init()
        {
            //var years = new List<Lookup<Int32, String>>();
            //var endYear = DateTime.Today.Year + 4;
            //for (int i = 2001; i < endYear; i++)
            //{
            //    years.Add(new Lookup<Int32, String> { Value = i, Text = (i - 1).ToString() + " - " + i.ToString() });
            //}
            //SchoolYears = years;

           
        }
    }
}