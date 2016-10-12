expensesType = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "ExpensesType",
            url: "/ExpensesType/_Index",
            rowNum: 100000,
            showEditButton: true,
            showDeleteButton: true,
            sortname: 'ExpensesName',
            jsonReader: {
                repeatitems: false,
                id: "ExpensesTypeId"
            },
            colNames: ['ExpensesTypeId', 'Наименование расхода', 'Примечание', 'Действия'],
            colModel: [
				{ name: 'ExpensesTypeId', index: 'ExpensesTypeId', key: true, hidden: true },
				{
				    name: 'ExpensesName', index: 'ExpensesName', width: 65,
				    sortable: true
				},
                {
                    name: 'Remark', index: 'Remark', width: 65,
                    sortable: false
                },
                { name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false }
            ]
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("ExpensesType");

        fpcs.jqGrid.initNavButtons("/ExpensesType/DeleteAll", expensesType.showCreateDialog, "Добавить новый вид расхода");
    //    personEmail.initPersonEmailButton();
       
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.initSendEmail);
       // fpcs.jqGrid.initNavSendEmailButton(fizPerson.showSendEmailDialog, "Отправить email");

        //fizPerson.initDetailsDialog();
        expensesType.initCreateDialogSend();
        expensesType.initEditDialog();
        expensesType.initDeleteOneEntity();
       // fizPerson.sendEmail();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("ExpensesType");
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
        fpcs.getPartial('/ExpensesType/_Create', function (data, textStatus) {
            fpcs.showDialog("Добавить новый вид расходов", data);
        });
    },


    initCreateDialogSend: function () {
        $(document).off("click", ".createExpensesTypeSend");
        $(document).on("click", ".createExpensesTypeSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createExpensesTypeForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    expensesType.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Добавить новый вид расходов", data);
                }
            });
        });
    },

    showEditDialog: function (id) {
        fpcs.getPartial('/ExpensesType/_Edit/' + id, function (data, textStatus) {
            fpcs.showDialog("Изменить данные о виде расходов", data);
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
            expensesType.showEditDialog(id);
        });

        $(document).off("click", ".editExpensesTypeSend");
        $(document).on("click", ".editExpensesTypeSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editExpensesTypeForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    expensesType.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Изменить данные о виде расхода", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/ExpensesType/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                expensesType.reloadGrid();
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