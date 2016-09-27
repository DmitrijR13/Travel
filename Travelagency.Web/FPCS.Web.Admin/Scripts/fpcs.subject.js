fpcs.subject = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "Subject",
            url: "/Subject/_Index",
            sortname: 'SubjectId',
            jsonReader: {
                repeatitems: false,
                id: "SubjectId"
            },
            colNames: ['ID', 'Name', 'Is Elective', 'Actions'],
            colModel: [
				{ name: 'SubjectId', index: 'SubjectId', key: true, hidden: true },
                { name: 'Name', index: 'Name', width: 150 },
                { name: 'IsElective', index: 'IsElective', width: 50, search: false },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false },
            ]
        });
        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("Subject");
        fpcs.jqGrid.initNavButtons("/Subject/DeleteAll", fpcs.subject.showCreateDialog, "Add new subject");

        fpcs.subject.initDetailsDialog();
        fpcs.subject.initCreateDialogSend();
        fpcs.subject.initEditDialog();
        fpcs.subject.initDeleteOneEntity();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("Subject");
        });
    },

    showDetailsDialog: function (id) {
        fpcs.getPartial('/Subject/_Details/' + id, function (data, textStatus) {
            fpcs.showDialog("Subject details", data);
        });
    },

    initDetailsDialog: function () {
        $(document).off("click", ".gridRowDetails");
        $(document).on("click", ".gridRowDetails", function (e) {
            var id = $(this).attr("rowid");
            fpcs.subject.showDetailsDialog(id);
        });
    },

    showCreateDialog: function () {
        fpcs.getPartial('/Subject/_Create/', function (data, textStatus) {
            fpcs.showDialog("Create subject", data);
        });
    },

    initCreateDialogSend: function () {
        $(document).off("click", ".createSubjectSend");
        $(document).on("click", ".createSubjectSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createSubjectForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.subject.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Create subject", data);
                }
            });
        });
    },

    initEditDialog: function () {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/Subject/_Edit/' + id, function (data, textStatus) {
                fpcs.showDialog("Edit subject", data);
            });
        });

        $(document).off("click", ".editSubjectSend");
        $(document).on("click", ".editSubjectSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editSubjectForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.subject.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit subject", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/Subject/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function (data) {
                if (typeof data == "object")
                    if (data.ErrorCode == 200) {
                        fpcs.subject.reloadGrid();
                    }
                    else {
                        fpcs.showErrorMessage(data.Message);
                    }
            });
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }
}