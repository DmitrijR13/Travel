fpcs.guardian = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "Guardian",
            url: "/Guardian/_Index",
            showDetailsButton: !fpcs.getIsGuardian(),
            showDeleteButton: !fpcs.getIsGuardian(),
            sortname: 'FullName',
            jsonReader: {
                repeatitems: false,
                id: "DbUserId"
            },
            colNames: ['ID', 'Name', 'Email', 'Is Locked', 'Actions'],
            colModel: [
				{ name: 'DbUserId', index: 'DbUserId', key: true, hidden: true },
				{ name: 'FullName', index: 'FullName', width: 120 },
				{ name: 'Email', index: 'Email', width: 120 },
                { name: 'IsLocked', index: 'IsLocked', width: 50, search: false },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false },
            ]
        });
        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("Guardian");

        if (!fpcs.getIsGuardian()) {
            fpcs.jqGrid.initNavButtons("/Guardian/DeleteAll", fpcs.guardian.showCreateDialog, "Add new guardian");
        }

        fpcs.guardian.initDetailsDialog();
        fpcs.guardian.initCreateDialogSend();
        fpcs.guardian.initEditDialog();
        fpcs.guardian.initDeleteOneEntity();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("Guardian");
        });
    },

    showDetailsDialog: function (id) {
        fpcs.getPartial('/Guardian/_Details/' + id, function (data, textStatus) {
            fpcs.showDialog("Guardian details", data);
        });
    },

    initDetailsDialog: function () {
        $(document).on("click", ".gridRowDetails", function (e) {
            var id = $(this).attr("rowid");
            fpcs.guardian.showDetailsDialog(id);
        });
    },

    showCreateDialog: function () {
        fpcs.getPartial('/Guardian/_Create/', function (data, textStatus) {
            fpcs.showDialog("Create Guardian", data);
            fpcs.initDatePicker();
        });
    },

    initCreateDialogSend: function () {
        $(document).on("click", ".createGuardianSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createGuardianForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.guardian.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Create Guardian", data);
                }
            });
        });

        $(document).off("click", ".cancelGuardianSend");
        $(document).on("click", ".cancelGuardianSend", function (e) {
            e.preventDefault();
            fpcs.closeDialog();
        });
    },

    showEditDialog: function (id) {
        fpcs.getPartial('/Guardian/_Edit/' + id, function (data, textStatus) {
            fpcs.showDialog("Edit Guardian", data);
            fpcs.initDatePicker();

            if (fpcs.getIsGuardian()) {
                $("#FirstName").prop("readonly", true);
                $("#LastName").prop("readonly", true);
                $("#MiddleInitial").prop("readonly", true);
            }
            else {
                $("#FirstName").prop("readonly", false);
                $("#LastName").prop("readonly", false);
                $("#MiddleInitial").prop("readonly", false);
            }
        });
    },

    initEditDialog: function () {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fpcs.guardian.showEditDialog(id);
        });

        $(document).off("click", ".editGuardianSend");
        $(document).on("click", ".editGuardianSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editGuardianForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.guardian.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit Guardian", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/Guardian/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fpcs.guardian.reloadGrid();
            });
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid");
    }
}