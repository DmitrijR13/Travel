worker = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "Worker",
            url: "/Worker/_Index",
            rowNum: 100000,
            showEditButton: true,
            showDeleteButton: true,
            sortname: 'FIO',
            jsonReader: {
                repeatitems: false,
                id: "WorkerId"
            },
            colNames: ['WorkerId', 'ФИО', 'Телефоны', 'Должность', 'Email', 'Дата начала работы', 'Дата увольнения', 'Действия'],
            colModel: [
				{ name: 'WorkerId', index: 'WorkerId', key: true, hidden: true },
				{
				    name: 'FIO', index: 'FIO', width: 65,
				    sortable: true
				},
                {
                    name: 'Phones', index: 'Phones', width: 65,
                    sortable: false
                },
                {
                    name: 'Job', index: 'Job', width: 70,
                    sortable: false,
                    resizeble: false 
                },
				{
				    name: 'Email', index: 'Email', width: 90
				},
                {
                    name: 'DateStart', index: 'DateStart', width: 90
                },
                {
                    name: 'DateFinish', index: 'DateFinish', width: 90
                },
                { name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false }
            ]
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("Worker");

        fpcs.jqGrid.initNavButtons("/Worker/DeleteAll", worker.showCreateDialog, "Добавить нового сотрудника");
        personEmail.initPersonEmailButton();
       
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.initSendEmail);
       // fpcs.jqGrid.initNavSendEmailButton(fizPerson.showSendEmailDialog, "Отправить email");

        //fizPerson.initDetailsDialog();
        fizPerson.initCreateDialogSend();
        fizPerson.initEditDialog();
        fizPerson.initDeleteOneEntity();
       // fizPerson.sendEmail();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("Worker");
        });
    },

    //showDetailsDialog: function (id) {
    //    fpcs.getPartial('/Student/_Details/' + id, function (data, textStatus) {
    //        fpcs.showDialog("Student details", data);
    //    });
    //},

    //initDetailsDialog: function () {
    //    $(document).on("click", ".gridRowDetails", function (e) {
    //        var id = $(this).attr("rowid");
    //        fpcs.student.showDetailsDialog(id);
    //    });
    //},

    showCreateDialog: function () {
        fpcs.getPartial('/Worker/_Create/', function (data, textStatus) {
            fpcs.showDialog("Добавить нового сотрудника", data);
        });
    },


    initCreateDialogSend: function () {
        $(document).off("click", ".createWorkerSend");
        $(document).on("click", ".createWorkerSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createWorkerForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    worker.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Добавить нового сотрудника", data);
                }
            });
        });
    },

    showEditDialog: function (id) {
        fpcs.getPartial('/Worker/_Edit/' + id, function (data, textStatus) {
            fpcs.showDialog("Изменить данные о сотруднике", data);
        });
    },

    //showSendEmailDialog: function () {
    //    var selRowIds = jQuery('#gridTable').jqGrid('getGridParam', 'selarrrow');
    //    fpcs.getPartial('/Fiz/SendEmail?ids=' + selRowIds, function (data, textStatus) {
    //        fpcs.showDialog("Отправить письма", data);
    //    });
    //},

    initEditDialog: function () {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            worker.showEditDialog(id);
        });

        $(document).off("click", ".editWorkerSend");
        $(document).on("click", ".editWorkerSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editWorkerForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    worker.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Изменить данные о сотруднике", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/Worker/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                worker.reloadGrid();
            });
        });
    },

    //sendEmail: function () {
    //    $(document).off("click", ".emailSend");
    //    $(document).on("click", ".emailSend", function (e) {
    //        e.preventDefault();
    //        fpcs.sendForm("sendEmailForm", function (data, textStatus) {
    //            if (typeof data == "object" && data.ErrorCode == 200) {
    //                fizPerson.reloadGrid();
    //                fpcs.closeDialog();
    //            }
    //            else {
    //                fpcs.showDialog("Отправить письма", data);
    //            }
    //        });
    //    });
    //},

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }

}