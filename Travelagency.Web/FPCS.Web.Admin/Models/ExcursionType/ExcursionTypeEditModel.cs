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

namespace FPCS.Web.Admin.Models.ExcursionType
{
    public class ExcursionTypeEditModel
    {
        [Required]
        public Int64 ExcursionTypeId { get; set; }

        [Required]
        [Display(Name = "Название маршрута")]
        public String PathName { get; set; }

        [Display(Name = "Описание")]
        public String Description { get; set; }

        [Required]
        [Display(Name = "Время начала")]
        public Time TimeFrom { get; set; }

        [Required]
        [Display(Name = "Время окончания")]
        public Time TimeTo { get; set; }

        [Required]
        [Display(Name = "Цена")]
        public Decimal Price { get; set; }

        public SelectList Times { get; set; }

        public void Init()
        {
            using (var uow = UnityManager.Instance.Resolve<IUnitOfWork>())
            {
                Times = TimeTo.ToSelectListUsingDesc();
            }
        }
    }
}