using FPCS.Core.Extensions;
using FPCS.Core.Unity;
using FPCS.Data;
using FPCS.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FPCS.Web.Admin.Models.Fiz
{
    public class FizCreateModel
    {
        [Required]
        [Display(Name = "ФИО")]
        public String FIO { get; set; }

        [Display(Name = "Городской телефон")]
        public String Phone { get; set; }

        [Display(Name = "Сотовый телефой")]
        public String CellPhone { get; set; }

        [EmailAddress]
        [Display(Name = "Email")]
        public String Email { get; set; }

        [Display(Name = "FieldOfActivity")]
        public String FieldOfActivity { get; set; }

        [Display(Name = "Дата рождения")]
        public DateTimeOffset? DateOfBirth { get; set; }

        [Display(Name = "Способ информирования")]
        public WayOfInform WayOfInform { get; set; }

        public SelectList WayOfInforms { get; set; }

        public void Init()
        {
            using (var uow = UnityManager.Instance.Resolve<IUnitOfWork>())
            {
                WayOfInforms = WayOfInform.ToSelectListUsingDesc();
            }
        }
    }
}