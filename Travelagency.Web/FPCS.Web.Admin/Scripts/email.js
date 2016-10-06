email = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "Email",
            url: "/Email/_Index",
            rowNum: 100000,
            showEditButton: true,
            showDeleteButton: true,
            sortname: 'Theme',
            jsonReader: {
                repeatitems: false,
                id: "EmailLetterId"
            },
            colNames: ['EmailLetterId', 'Тема письма', 'Текст письма', 'Дата письма', 'Действия'],
            colModel: [
				{ name: 'EmailLetterId', index: 'EmailLetterId', key: true, hidden: true },
				{
				    name: 'Theme', index: 'Theme', width: 65,
				    sortable: true
				},
                {
                    name: 'Body', index: 'Body', width: 400,
                    sortable: false
                },
                {
                    name: 'CreateDate', index: 'CreateDate', width: 70,
                    sortable: false,
                    resizeble: false 
                },
                { name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false }
            ],
            rowButtons: [
                {
                    title: "Детали письма", rowClass: "gridRowEmailInfo", rowIcon: "icon-info green"
                }//,
                //!fpcs.getIsTeacher() ?
                    //{ title: "Transfer Manager", rowClass: "gridRowStudentTransfer", rowIcon: "icon-dollar green" } :
                    //null
            ]
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("Email");

        fpcs.jqGrid.initNavButtons("/Email/DeleteAll", null, "");
        email.initEmailInfoButton();
       
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.initSendEmail);
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.showSendEmailDialog, "Отправить email");

        //fizPerson.initDetailsDialog();
        //fizPerson.initCreateDialogSend();
        //fizPerson.initEditDialog();
        //fizPerson.initDeleteOneEntity();
        //fizPerson.sendEmail();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("Email");
        });
    },

    initEmailInfoButton: function () {
        $(document).off("click", ".gridRowEmailInfo");
        $(document).on("click", ".gridRowEmailInfo", function (e) {
            var id = $(this).attr("rowid");
            location.href = "/Email/EmailDetail/" + id;
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

    //showCreateDialog: function () {
    //    fpcs.getPartial('/Fiz/_Create/', function (data, textStatus) {
    //        fpcs.showDialog("Добавить нового клиента", data);
    //    });
    //},


    //initCreateDialogSend: function () {
    //    $(document).off("click", ".createFizPersonSend");
    //    $(document).on("click", ".createFizPersonSend", function (e) {
    //        e.preventDefault();
    //        fpcs.sendForm("createFizPersonForm", function (data, textStatus) {
    //            if (typeof data == "object" && data.ErrorCode == 200) {
    //                fizPerson.reloadGrid();
    //                fpcs.closeDialog();
    //            }
    //            else {
    //                fpcs.showDialog("Добавить нового клиента", data);
    //            }
    //        });
    //    });
    //},

    //showEditDialog: function (id) {
    //    fpcs.getPartial('/Fiz/_Edit/' + id, function (data, textStatus) {
    //        fpcs.showDialog("Изменить данные о клиенте", data);
    //    });
    //},

    //showSendEmailDialog: function () {
    //    var selRowIds = jQuery('#gridTable').jqGrid('getGridParam', 'selarrrow');
    //    fpcs.getPartial('/Fiz/SendEmail?ids=' + selRowIds, function (data, textStatus) {
    //        fpcs.showDialog("Отправить письма", data);
    //    });
    //},

    //initEditDialog: function () {
    //    $(document).off("click", ".gridRowEdit");
    //    $(document).on("click", ".gridRowEdit", function (e) {
    //        var id = $(this).attr("rowid");
    //        fizPerson.showEditDialog(id);
    //    });

    //    $(document).off("click", ".editFizPersonSend");
    //    $(document).on("click", ".editFizPersonSend", function (e) {
    //        e.preventDefault();
    //        fpcs.sendForm("editFizPersonForm", function (data, textStatus) {
    //            if (typeof data == "object" && data.ErrorCode == 200) {
    //                fizPerson.reloadGrid();
    //                fpcs.closeDialog();
    //            }
    //            else {
    //                fpcs.showDialog("Изменить данные о клиенте", data);
    //            }
    //        });
    //    });
    //},

    //initDeleteOneEntity: function () {
    //    $(document).off("click", ".gridRowDelete");
    //    $(document).on("click", ".gridRowDelete", function (e) {
    //        var id = $(this).attr("rowid");
    //        var url = "/Fiz/Delete/" + id;
    //        fpcs.executeServiceWithConfirm(url, null, function () {
    //            fizPerson.reloadGrid();
    //        });
    //    });
    //},

    //sendEmail: function () {
    //    $(document).off("click", ".emailSend");
    //    $(document).on("click", ".emailSend", function (e) {
    //        e.preventDefault();
    //        fpcs.sendForm("sendEmailForm", function (data, textStatus) {
    //            debugger;
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