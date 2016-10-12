excursionType = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "ExcursionType",
            url: "/ExcursionType/_Index",
            rowNum: 100000,
            showEditButton: true,
            showDeleteButton: true,
            sortname: 'PathName',
            jsonReader: {
                repeatitems: false,
                id: "ExcursionTypeId"
            },
            colNames: ['ExcursionTypeId', 'Наименование маршрута', 'Краткое описание', 'Начало', 'Окончание', 'Цена', 'Действия'],
            colModel: [
				{ name: 'ExcursionTypeId', index: 'ExcursionTypeId', key: true, hidden: true },
				{
				    name: 'PathName', index: 'PathName', width: 65,
				    sortable: true
				},
                {
                    name: 'Description', index: 'Description', width: 65,
                    sortable: false
                },
                {
                    name: 'TimeFrom', index: 'TimeFrom', width: 80,
                    stype: "select",
                    searchoptions: {
                        value: ":Все;" + $("#times").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
                {
                    name: 'TimeTo', index: 'TimeTo', width: 80,
                    stype: "select",
                    searchoptions: {
                        value: ":Все;" + $("#times").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
				{
				    name: 'Price', index: 'Price', width: 90
				},
                { name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false }
            ]
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("ExcursionType");

        fpcs.jqGrid.initNavButtons("/ExcursionType/DeleteAll", excursionType.showCreateDialog, "Добавить новый вид экскурсии");
    //    personEmail.initPersonEmailButton();
       
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.initSendEmail);
       // fpcs.jqGrid.initNavSendEmailButton(fizPerson.showSendEmailDialog, "Отправить email");

        //fizPerson.initDetailsDialog();
        excursionType.initCreateDialogSend();
        excursionType.initEditDialog();
        excursionType.initDeleteOneEntity();
       // fizPerson.sendEmail();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("ExcursionType");
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
        fpcs.getPartial('/ExcursionType/_Create/', function (data, textStatus) {
            fpcs.showDialog("Добавить новую экскурсию", data);
        });
    },


    initCreateDialogSend: function () {
        $(document).off("click", ".createExcursionTypeSend");
        $(document).on("click", ".createExcursionTypeSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createExcursionTypeForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    excursionType.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Добавить новую экскурсию", data);
                }
            });
        });
    },

    showEditDialog: function (id) {
        fpcs.getPartial('/ExcursionType/_Edit/' + id, function (data, textStatus) {
            fpcs.showDialog("Изменить данные об экскурсии", data);
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
            excursionType.showEditDialog(id);
        });

        $(document).off("click", ".editExcursionTypeSend");
        $(document).on("click", ".editExcursionTypeSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editExcursionTypeForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    excursionType.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Изменить данные об экскурсии", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/ExcursionType/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                excursionType.reloadGrid();
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