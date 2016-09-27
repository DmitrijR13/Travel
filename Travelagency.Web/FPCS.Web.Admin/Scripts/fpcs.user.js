fpcs.user = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "User",
            showDeleteButton: true,
            url: "/User/_Index",
            sortname: 'FullName',
            jsonReader: {
                repeatitems: false,
                id: "DbUserId"
            },
            colNames: ['ID', 'Name', 'Email', 'Role', 'Is Locked', 'Actions'],
            colModel: [
				{ name: 'DbUserId', index: 'DbUserId', key: true, hidden: true },
				{ name: 'FullName', index: 'FullName', width: 120 },
				{ name: 'Email', index: 'Email', width: 120 },
                {
                    name: 'RoleStr', index: 'Role', width: 70,
                    stype: "select",
                    searchoptions: {
                        value: ":All;" + $("#stypeRole").val(),
                        defaultValue: ""
                    }
                },
                {
                    name: 'IsLocked', index: 'IsLocked', width: 50,
                    stype: "select",
                    searchoptions: {
                        value: ":All;" + $("#stypeIsLocked").val(),
                        defaultValue: ""
                    }
                },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false }
            ]
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("User");
        fpcs.jqGrid.initNavButtons(null, fpcs.user.showCreateDialog, "Add new user");

        fpcs.user.initDetailsDialog();
        fpcs.user.initEditDialog();
        fpcs.user.initDeleteOneEntity();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("User");
        });
    },

    showCreateDialog: function () {
        fpcs.getPartial('/User/_Create/', function (data, textStatus) {
            fpcs.showDialog("Create User - Admin", data);

            $(document).on("click", ".createUserSend", function (e) {
                e.preventDefault();
                fpcs.sendForm("createUserForm", function (data, textStatus) {
                    if (typeof data == "object" && data.ErrorCode == 200) {
                        fpcs.user.reloadGrid();
                        fpcs.closeDialog();
                    }
                    else {
                        fpcs.showDialog("Create User - Admin", data);
                    }
                });
            });
        });
    },

    showDetailsDialog: function (id) {
        fpcs.getPartial('/User/_Details/' + id, function (data, textStatus) {
            fpcs.showDialog("User details", data);
        });
    },

    initDetailsDialog: function () {
        $(document).on("click", ".gridRowDetails", function (e) {
            var id = $(this).attr("rowid");
            fpcs.user.showDetailsDialog(id);
        });
    },

    showEditDialog: function (id) {
        fpcs.getPartial('/User/_Edit/' + id, function (data, textStatus) {
            fpcs.showDialog("Edit User", data);
            fpcs.user.initIsLockedCheckbox();
        });
    },

    initEditDialog: function () {
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fpcs.user.showEditDialog(id);
        });

        $(document).on("click", ".editUserSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editUserForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.user.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit User", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/User/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fpcs.user.reloadGrid();
            });
        });
    },

    initIsLockedCheckbox: function () {
        $(document).on("change", "#IsLocked", function (e) {
            if ($(this).is(":checked")) {
                $(".isSendEmail").hide();
            } else {
                $(".isSendEmail").show();
            }
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }
}