fpcs.monthlyContactLog = {

    initIndexPage: function (familyId) {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            showDetailsButton: false,
            toppager: true,
            url: "/Family/_MonthlyContactLog?familyId=" + familyId,
            sortname: 'Date',
            sortorder: "desc",
            jsonReader: {
                repeatitems: false,
                id: "MonthlyContactLogId"
            },
            colNames: ['ID', '', '', 'Teacher Name', 'Date', 'Comment', 'Actions'],
            colModel: [
				{ name: 'MonthlyContactLogId', index: 'MonthlyContactLogId', key: true, hidden: true },
                { name: 'FamilyId', index: 'FamilyId', hidden: true },
                { name: 'TeacherId', index: 'TeacherId', hidden: true },
				{ name: 'TeacherName', index: 'TeacherName', width: 60, sortable: false },
				{ name: 'Date', index: 'Date', width: 60, search: false, sortable: false },
                { name: 'Comment', index: 'Comment', width: 460, search: false, sortable: false },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false },
            ]
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar();
        fpcs.jqGrid.initNavButtons(null, fpcs.monthlyContactLog.showCreatePage, "Add new monthly contact log");
        fpcs.jqGrid.initNavPrintButton(fpcs.monthlyContactLog.initPrint);

        fpcs.monthlyContactLog.initShowEditPage();
        fpcs.monthlyContactLog.initDeleteOneEntity();
        fpcs.monthlyContactLog.topNavButtons();
    },

    showCreatePage: function () {
        var familyId = $("#familyId").val()
        fpcs.getPartial('/Family/_CreateMonthlyContactLog?familyId=' + familyId, function (data, textStatus) {
            fpcs.showDialog("Monthly Contact Log", data);
            fpcs.monthlyContactLog.initCreateEditPages();
        });
    },

    initShowEditPage: function (id) {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/Family/_EditMonthlyContactLog/' + id, function (data, textStatus) {
                fpcs.showDialog("Monthly Contact Log", data);
                fpcs.monthlyContactLog.initCreateEditPages();
            });
        });
    },

    initPrint: function () {
        var params = jQuery("#gridTable").jqGrid('getGridParam', 'selarrrow');

        if (params.length == 0) {
            jAlert("You must choose rows", "Information");
            return;
        }

        fpcs.getPartialThroughPost('/Family/_Print/', { paramsIds: JSON.stringify(params) }, function (data, textStatus) {
            fpcs.showDialog("Print Form", data);
        });
    },

    topNavButtons: function () {
        var toolbarClone = $('#gridPager_left').clone(true);
        $('#gridTable_toppager_left').prepend(toolbarClone);
        var topPagerDiv = $("#gridTable_toppager")[0];
        $("#gridTable_toppager_center", topPagerDiv).remove();
        $("#gridTable_toppager_right", topPagerDiv).remove();
        $(".ui-paging-info", topPagerDiv).remove();
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/Family/_DeleteMonthlyContactLog/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fpcs.monthlyContactLog.reloadGrid();
            });
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    },

    initCreateEditPages: function () {
        fpcs.initDatePicker();

        $(".btn-save").off("click");
        $(".btn-save").on("click", function (e) {
            e.preventDefault();
            fpcs.sendForm("monthlyContactLogForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.monthlyContactLog.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Monthly Contact Log", data);
                    fpcs.monthlyContactLog.initCreateEditPages();
                }
            });
        });

        $(".btn-cancel").off("click");
        $(".btn-cancel").on("click", function (e) {
            fpcs.closeDialog();
        });
    }
}