fizPerson = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "Fiz",
            url: "/Fiz/_Index",
            rowNum: 100000,
            showEditButton: true,
            showDeleteButton: true,
            sortname: 'FIO',
            jsonReader: {
                repeatitems: false,
                id: "PersonId"
            },
            colNames: ['PersonId', 'ФИО', 'Телефоны', 'FieldOfActivity', 'Email', 'Способ информирования', 'Дата рождения', 'Действия'],
            colModel: [
				{ name: 'PersonId', index: 'PersonId', key: true, hidden: true },
				{
				    name: 'FIO', index: 'FIO', width: 65,
				    sortable: true
				},
                {
                    name: 'Phones', index: 'Phones', width: 65,
                    sortable: false
                },
                {
                    name: 'FieldOfActivity', index: 'FieldOfActivity', width: 70,
                    sortable: false,
                    resizeble: false 
                },
				{
				    name: 'Email', index: 'Email', width: 90
				},
                {
                    name: 'WayOfInform', index: 'WayOfInform', width: 80,
                    stype: "select",
                    searchoptions: {
                        value: ":Все;" + $("#wayOfInforms").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
                {
                    name: 'DateOfBirth', index: 'DateOfBirth', width: 90
                },
                { name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false }
            ],
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("FizPerson");

        fpcs.jqGrid.initNavButtons("/Fiz/DeleteAll", fizPerson.showCreateDialog, "Добавить нового клиента");
        
       
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.initSendEmail);
        fpcs.jqGrid.initNavSendEmailButton(fizPerson.showSendEmailDialog, "Отправить email");

        //fizPerson.initDetailsDialog();
        fizPerson.initCreateDialogSend();
        fizPerson.initEditDialog();
        fizPerson.initDeleteOneEntity();
        fizPerson.sendEmail();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("FizPerson");
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
        fpcs.getPartial('/Fiz/_Create/', function (data, textStatus) {
            fpcs.showDialog("Добавить нового клиента", data);
        });
    },


    initCreateDialogSend: function () {
        $(document).off("click", ".createFizPersonSend");
        $(document).on("click", ".createFizPersonSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createFizPersonForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fizPerson.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Добавить нового клиента", data);
                }
            });
        });
    },

    showEditDialog: function (id) {
        fpcs.getPartial('/Fiz/_Edit/' + id, function (data, textStatus) {
            fpcs.showDialog("Изменить данные о клиенте", data);
        });
    },

    showSendEmailDialog: function () {
        var selRowIds = jQuery('#gridTable').jqGrid('getGridParam', 'selarrrow');
        fpcs.getPartial('/Fiz/SendEmail?ids=' + selRowIds, function (data, textStatus) {
            fpcs.showDialog("Отправить письма", data);
        });
    },

    initEditDialog: function () {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fizPerson.showEditDialog(id);
        });

        $(document).off("click", ".editFizPersonSend");
        $(document).on("click", ".editFizPersonSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editFizPersonForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fizPerson.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Изменить данные о клиенте", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/Fiz/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fizPerson.reloadGrid();
            });
        });
    },

    sendEmail: function () {
        $(document).off("click", ".emailSend");
        $(document).on("click", ".emailSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("sendEmailForm", function (data, textStatus) {
                debugger;
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fizPerson.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Отправить письма", data);
                }
            });
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }

}