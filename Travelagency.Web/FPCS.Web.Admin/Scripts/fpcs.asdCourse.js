fpcs.asdCourse = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "ASDCourse",
            url: "/ASDCourse/_Index",
            sortname: 'ASDCourseId',
            jsonReader: {
                repeatitems: false,
                id: "ASDCourseId"
            },
            colNames: ['ID', 'ASD Course Id', 'Subject', 'Name', 'Unit', 'Is Activated', 'Is Free', 'Actions'],
            colModel: [
				{ name: 'ASDCourseId', index: 'ASDCourseId', key: true, hidden: true },
				{ name: 'ExternalASDCourseId', index: 'ExternalASDCourseId', width: 100 },
				{ name: 'Subject', index: 'Subject', width: 150 },
                { name: 'Name', index: 'Name', width: 150 },
                { name: 'GradCredit', index: 'GradCredit', width: 40 },
                { name: 'IsActivated', index: 'IsActivated', width: 50, search: false },
                { name: 'IsFree', index: 'IsFree', width: 50, search: false },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false },
            ]
        });
        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("ASDCourse");
        fpcs.jqGrid.initNavButtons("/ASDCourse/DeleteAll", fpcs.asdCourse.showCreateDialog, "Add new ASD course");

        fpcs.asdCourse.initDetailsDialog();
        fpcs.asdCourse.initCreateDialogSend();
        fpcs.asdCourse.initEditDialog();
        fpcs.asdCourse.initDeleteOneEntity();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("ASDCourse");
        });
    },

    showDetailsDialog: function (id) {
        fpcs.getPartial('/ASDCourse/_Details/' + id, function (data, textStatus) {
            fpcs.showDialog("ASD Course details", data);
        });
    },

    initDetailsDialog: function () {
        $(document).on("click", ".gridRowDetails", function (e) {
            var id = $(this).attr("rowid");
            fpcs.asdCourse.showDetailsDialog(id);
        });
    },

    showCreateDialog: function () {
        fpcs.getPartial('/ASDCourse/_Create/', function (data, textStatus) {
            fpcs.showDialog("Create ASD Course", data);
        });
    },

    initCreateDialogSend: function () {
        $(document).on("click", ".createASDCourseSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createASDCourseForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.asdCourse.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Create ASD Course", data);
                }
            });
        });
    },

    initEditDialog: function () {
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/ASDCourse/_Edit/' + id, function (data, textStatus) {
                fpcs.showDialog("Edit ASD Course", data);
            });
        });

        $(document).on("click", ".editASDCourseSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editASDCourseForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.asdCourse.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit ASD Course", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/ASDCourse/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function (data) {
                if (typeof data == "object")
                    if (data.ErrorCode == 200) {
                        fpcs.asdCourse.reloadGrid();
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