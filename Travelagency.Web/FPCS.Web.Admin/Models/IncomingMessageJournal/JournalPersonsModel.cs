using System;

using FPCS.Core.jqGrid;
using FPCS.Data.Enums;
using System.ComponentModel.DataAnnotations;
using FPCS.Web.Admin.Models.Person;
using System.Web.Mvc;
using System.Collections.Generic;

namespace FPCS.Web.Admin.Models.IncomingMessageJournal
{
    public class JournalPersonsModel
    {
        [Display(Name = "Клиент")]
        public IEnumerable<LightPersonModel> JournalPersons { get; set; }

        public SelectList Persons { get; set; }
    }
}