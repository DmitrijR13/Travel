promotionAction = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "PromotionAction",
            url: "/PromotionAction/_Index",
            rowNum: 100000,
            showEditButton: true,
            showDeleteButton: true,
            sortname: 'Name',
            jsonReader: {
                repeatitems: false,
                id: "PromotionActionId"
            },
            colNames: ['PromotionActionId', 'Наименование', 'Дата начала', 'Дата окончания', 'Форма проведения', 'Действия'],
            colModel: [
				{ name: 'PromotionActionId', index: 'PromotionActionId', key: true, hidden: true },
				{
                    name: 'Name', index: 'Name', width: 65,
                    sortable: true
				},
                {
                    name: 'DateStart', index: 'DateStart', width: 90
                },
                {
                    name: 'DateFinish', index: 'DateFinish', width: 90
                },
                {
                    name: 'PrAction', index: 'PrAction', width: 80,
                    stype: "select",
                    searchoptions: {
                        value: ":Все;" + $("#prActions").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
                { name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false }
            ]
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("PromotionAction");

        fpcs.jqGrid.initNavButtons("/PromotionAction/DeleteAll", promotionAction.showCreateDialog, "Добавить новый вид рекламной акции");
    //    personEmail.initPersonEmailButton();
       
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.initSendEmail);
       // fpcs.jqGrid.initNavSendEmailButton(fizPerson.showSendEmailDialog, "Отправить email");

        //fizPerson.initDetailsDialog();
        promotionAction.initCreateDialogSend();
        promotionAction.initEditDialog();
        promotionAction.initDeleteOneEntity();
       // fizPerson.sendEmail();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("PromotionAction");
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
        fpcs.getPartial('/PromotionAction/_Create/', function (data, textStatus) {
            fpcs.showDialog("Добавить новую рекламную акцию", data);
        });
    },


    initCreateDialogSend: function () {
        $(document).off("click", ".createPromotionActionSend");
        $(document).on("click", ".createPromotionActionSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createPromotionActionForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    promotionAction.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Добавить новую рекламную акцию", data);
                }
            });
        });
    },

    showEditDialog: function (id) {
        fpcs.getPartial('/PromotionAction/_Edit/' + id, function (data, textStatus) {
            fpcs.showDialog("Изменить данные о рекламной акции", data);
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
            promotionAction.showEditDialog(id);
        });

        $(document).off("click", ".editPromotionActionSend");
        $(document).on("click", ".editPromotionActionSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editPromotionActionForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    promotionAction.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Изменить данные о рекламной акции", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/PromotionAction/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                promotionAction.reloadGrid();
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