using FPCS.Core.Extensions;
using FPCS.Core.Unity;
using FPCS.Data;
using FPCS.Data.Enums;
using FPCS.Data.Repo;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FPCS.Web.Admin.Models.IncomingMessageJournal
{
    public class IncomingMessageJournalEditModel
    {
        [Required]
        public Int64 IncomingMessageJournalId { get; set; }

        [Required]
        [Display(Name = "Дата")]
        public DateTimeOffset Date { get; set; }

        public SelectList Persons { get; set; }

        [Required]
        [Display(Name = "Физическое лицо")]
        public Int64 PersonId { get; set; }

        [Required]
        [Display(Name = "Содержание заявки")]
        public String RequestContent { get; set; }

        public SelectList AcceptedsByWorkers { get; set; }

        [Required]
        [Display(Name = "Принял")]
        public Int64 AcceptedById { get; set; }

        public SelectList ResponsibleWorkers { get; set; }

        [Required]
        [Display(Name = "Ответсвенный")]
        public Int64 ResponsibleId { get; set; }

        [Display(Name = "Источник поступления")]
        public IncomingSource IncomingSource { get; set; }

        [Required]
        [Display(Name = "Результат")]
        public String Result { get; set; }

        [Display(Name = "Источник информации о нас")]
        public SourceInfo SourceInfo { get; set; }

        public SelectList IncomingSources { get; set; }

        public SelectList SourceInfos { get; set; }

        public void Init()
        {
            using (var uow = UnityManager.Instance.Resolve<IUnitOfWork>())
            {
                var repoPerson = uow.GetRepo<IPersonRepo>();
                var persons = repoPerson.GetAll().Select(x => new Lookup<Int64> { Value = x.PersonId, Text = x.FIO }).ToList();
                Persons = new SelectList(persons, "Value", "Text");

                var repoWorker = uow.GetRepo<IWorkerRepo>();
                var workers = repoWorker.GetAll().Select(x => new Lookup<Int64> { Value = x.WorkerId, Text = x.FIO }).ToList();
                AcceptedsByWorkers = new SelectList(workers, "Value", "Text");
                ResponsibleWorkers = new SelectList(workers, "Value", "Text");

                IncomingSources = IncomingSource.ToSelectListUsingDesc();
                SourceInfos = SourceInfo.ToSelectListUsingDesc();
            }
        }
    }
}