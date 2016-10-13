incomingMessageJournal = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "IncomingMessageJournal",
            url: "/IncomingMessageJournal/_Index",
            rowNum: 100000,
            showEditButton: true,
            showDeleteButton: true,
            sortname: 'Fio',
            jsonReader: {
                repeatitems: false,
                id: "IncomingMessageJournalId"
            },
            colNames: ['IncomingMessageJournalId', 'Дата', 'ФИО', 'Телефон', 'Содержание заявки', 'Принял', 'Ответсвенный',
                'Источник поступления', 'Результат', 'Источник информации о нас', 'Действия'],
            colModel: [
				{ name: 'PromotionActionId', index: 'PromotionActionId', key: true, hidden: true },
				{
                    name: 'Date', index: 'Date', width: 65,
                    sortable: true
				},
                {
                    name: 'Fio', index: 'Fio', width: 90
                },
                {
                    name: 'Phones', index: 'Phones', width: 90
                },
                {
                    name: 'RequestContent', index: 'RequestContent', width: 90
                },
                {
                    name: 'AcceptedByWorkerFio', index: 'AcceptedByWorkerFio', width: 90
                },
                {
                    name: 'ResponsibleWorkerFio', index: 'ResponsibleWorkerFio', width: 90
                },
                {
                    name: 'IncomingSource', index: 'IncomingSource', width: 80,
                    stype: "select",
                    searchoptions: {
                        value: ":Все;" + $("#incomingSources").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
                {
                    name: 'Result', index: 'Result', width: 90
                },
                {
                    name: 'SourceInfo', index: 'SourceInfo', width: 80,
                    stype: "select",
                    searchoptions: {
                        value: ":Все;" + $("#sourceInfos").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
                { name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false }
            ]
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("IncomingMessageJournal");

        fpcs.jqGrid.initNavButtons("/IncomingMessageJournal/DeleteAll", incomingMessageJournal.showCreateDialog, "Добавить новую заявку");
    //    personEmail.initPersonEmailButton();
       
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.initSendEmail);
       // fpcs.jqGrid.initNavSendEmailButton(fizPerson.showSendEmailDialog, "Отправить email");

        //fizPerson.initDetailsDialog();
        incomingMessageJournal.initCreateDialogSend();
        incomingMessageJournal.initEditDialog();
        incomingMessageJournal.initDeleteOneEntity();
       // fizPerson.sendEmail();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("IncomingMessageJournal");
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
        fpcs.getPartial('/IncomingMessageJournal/_Create/', function (data, textStatus) {
            fpcs.showDialog("Добавить новую заявку", data);
        });
    },


    initCreateDialogSend: function () {
        $(document).off("click", ".createIncomingMessageJournalSend");
        $(document).on("click", ".createIncomingMessageJournalSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createIncomingMessageJournalForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    incomingMessageJournal.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Добавить новую заявку", data);
                }
            });
        });
    },

    showEditDialog: function (id) {
        fpcs.getPartial('/IncomingMessageJournal/_Edit/' + id, function (data, textStatus) {
            fpcs.showDialog("Изменить данные о заявке", data);
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
            incomingMessageJournal.showEditDialog(id);
        });

        $(document).off("click", ".editIncomingMessageJournalSend");
        $(document).on("click", ".editIncomingMessageJournalSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editIncomingMessageJournalForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    incomingMessageJournal.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Изменить данные о заявке", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/IncomingMessageJournal/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                incomingMessageJournal.reloadGrid();
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