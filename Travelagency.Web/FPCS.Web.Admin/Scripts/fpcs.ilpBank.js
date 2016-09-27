fpcs.ilpBank = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "ILPBank",
            url: "/ILPBank/_Index",
            sortname: 'Teacher',
            jsonReader: {
                repeatitems: false,
                id: "ILPBankId"
            },
            colNames: ['ID', 'Name', 'TeacherId', 'Teacher', 'GuardianId', 'Guardian', 'Subject', 'Year', 'Public/Private', 'Actions'],
            colModel: [
				{ name: 'ILPBankId', index: 'ILPBankId', key: true, hidden: true },
				{ name: 'Name', index: 'Name', width: 100 },
                { name: 'TeacherId', index: 'TeacherId', hidden: true },
                { name: 'Teacher', index: 'Teacher', width: 150 },
                { name: 'GuardianId', index: 'GuardianId', hidden: true },
                { name: 'Guardian', index: 'Guardian', width: 150 },
				{ name: 'Subject', index: 'Subject', width: 150 },
                { name: 'Year', index: 'Year', width: 150 },
                {
                    name: 'IsPublic',
                    index: 'IsPublic',
                    width: 150,
                    stype: "select",
                    searchoptions: {
                        value: ":All;true:Public;false:Private",
                        defaultValue: ""
                    }
                },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false }
            ],
            gridComplete: function () {
                var ids = grid.jqGrid('getDataIDs');
                for (var i = 0; i < ids.length; i++) {
                    var cl = ids[i];

                    var row = grid.getRowData(cl);

                    var showEditButton = fpcs.getIsAdmin() ||
                                         (fpcs.getIsTeacher() && fpcs.getCurrentUserId() == row.TeacherId) ||
                                         (fpcs.getIsGuardian() && fpcs.getCurrentUserId() == row.GuardianId);

                    var showDeleteButton = showEditButton;

                    var details = '';
                    if (!fpcs.getIsAdmin()) {
                        details = '<td title="View details"><div rowid="' + cl + '" class="ui-pg-div gridRowDetails"><span class="ui-icon icon-zoom-in grey"></span></div></td>';
                    }

                    var edit = !showEditButton ? '' : '<td title="Edit"><div rowid="' + cl + '" class="ui-pg-div gridRowEdit"><span class="ui-icon icon-pencil blue"></span></div></td>';
                    var del = !showDeleteButton ? '' : '<td title="Delete"><div rowid="' + cl + '" class="ui-pg-div gridRowDelete"><span class="ui-icon icon-trash red"></span></div></td>';

                    var table = '<table class="gridRowActions"><tbody><tr>' + details + edit + del + '</tr></tbody></table>';
                    grid.jqGrid('setRowData', ids[i], { act: table });
                }
            },
        });
        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("ILPBank");

        fpcs.jqGrid.initNavButtons(null, null);

        fpcs.ilpBank.initDetailsDialog();
        fpcs.ilpBank.initEditDialog();
        fpcs.ilpBank.initDeleteILPBank();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("ILPBank");
        });
    },

    showDetailsDialog: function (id) {
        fpcs.getPartial('/ILPBank/_Details/' + id, function (data, textStatus) {
            fpcs.showDialog("Course Description Bank details", data);

            fpcs.ilpBank.initDialog();

            $(document).off("click", ".cancelILP");
            $(document).on("click", ".cancelILP", function (e) {
                fpcs.closeDialog();
            });
        });
    },

    initDetailsDialog: function () {
        $(document).off("click", ".gridRowDetails");
        $(document).on("click", ".gridRowDetails", function (e) {
            var id = $(this).attr("rowid");
            fpcs.ilpBank.showDetailsDialog(id);
        });
    },

    initEditDialog: function () {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/ILPBank/_Edit/' + id, function (data, textStatus) {
                fpcs.showDialog("Edit Course Description Bank", data);

                fpcs.ilpBank.initDialog();

                $(document).off("click", ".editILPBankSend");
                $(document).on("click", ".editILPBankSend", function (e) {
                    e.preventDefault();
                    fpcs.sendForm("editILPBankForm", function (data, textStatus) {
                        if (typeof data == "object" && data.ErrorCode == 200) {
                            fpcs.ilpBank.reloadGrid();
                            fpcs.closeDialog();
                        }
                        else {
                            fpcs.showDialog("Edit Course Description Bank", data);
                        }
                    });
                });

                $(document).off("click", ".cancelILP");
                $(document).on("click", ".cancelILP", function (e) {
                    fpcs.closeDialog();
                });
            });
        });
    },

    initDeleteILPBank: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/ILPBank/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fpcs.ilpBank.reloadGrid();
            });
        });
    },

    initDialog: function () {
        var val = $("#EvaluationGradingGradingScale:checked");
        if (val.length != 0) { $("#gradingScaleDecipher").show(); }
        else { $("#gradingScaleDecipher").hide(); }

        val = $("#EvaluationGradingOther:checked");
        if (val.length != 0) { $("#gradingOtherExplainDecipher").show(); }
        else { $("#gradingOtherExplainDecipher").hide(); }

        $("#EvaluationGradingGradingScale").off("click");
        $("#EvaluationGradingGradingScale").on("click", function () {
            var val = $("#EvaluationGradingGradingScale:checked");
            if (val.length != 0) { $("#gradingScaleDecipher").show(); }
            else { $("#gradingScaleDecipher").hide(); }
        });

        $("#EvaluationGradingOther").off("click");
        $("#EvaluationGradingOther").on("click", function () {
            var val = $("#EvaluationGradingOther:checked");
            if (val.length != 0) { $("#gradingOtherExplainDecipher").show(); }
            else { $("#gradingOtherExplainDecipher").hide(); }
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }
}