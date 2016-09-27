fpcs.ILP = {

    initILPSaveDialog: function () {
        fpcs.ILP.initChecked();

        fpcs.ILP.initActionCreateGoodService();

        fpcs.ILP.initILPBankTable();

        fpcs.ILP.initPrint();
    },

    initChecked: function () {
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

    initCheckedInfo: function () {
        var val = $("#infoILPContent #EvaluationGradingGradingScale:checked");
        if (val.length != 0) { $("#infoILPContent #gradingScaleDecipher").show(); }
        else { $("#infoILPContent #gradingScaleDecipher").hide(); }

        val = $("#infoILPContent #EvaluationGradingOther:checked");
        if (val.length != 0) { $("#infoILPContent #gradingOtherExplainDecipher").show(); }
        else { $("#infoILPContent #gradingOtherExplainDecipher").hide(); }

        $("#infoILPContent #EvaluationGradingGradingScale").on("click", function () {
            var val = $("#infoILPContent #EvaluationGradingGradingScale:checked");
            if (val.length != 0) { $("#infoILPContent #gradingScaleDecipher").show(); }
            else { $("#infoILPContent #gradingScaleDecipher").hide(); }
        });

        $("#infoILPContent #EvaluationGradingOther").on("click", function () {
            var val = $("#infoILPContent #EvaluationGradingOther:checked");
            if (val.length != 0) { $("#infoILPContent #gradingOtherExplainDecipher").show(); }
            else { $("#infoILPContent #gradingOtherExplainDecipher").hide(); }
        });
    },

    initILPBankTable: function () {
        $("#fltILPName").keyup(function (event) {
            if (event.keyCode == 13) {
                fpcs.ILP.loadILPBankTable();
            }
        });

        $("#fltTeacher").keyup(function (event) {
            if (event.keyCode == 13) {
                fpcs.ILP.loadILPBankTable();
            }
        });

        $("#fltGuardian").keyup(function (event) {
            if (event.keyCode == 13) {
                fpcs.ILP.loadILPBankTable();
            }
        });

        $("#fltSubject").keyup(function (event) {
            if (event.keyCode == 13) {
                fpcs.ILP.loadILPBankTable();
            }
        });

        $("#fltYear").keyup(function (event) {
            if (event.keyCode == 13) {
                fpcs.ILP.loadILPBankTable();
            }
        });

        fpcs.ILP.loadILPBankTable();
    },

    loadILPBankTable: function () {
        var params = {
            name: $("#fltILPName").val(),
            teacher: $("#fltTeacher").val(),
            guardian: $("#fltGuardian").val(),
            subject: $("#fltSubject").val(),
            year: $("#fltYear").val()
        };

        fpcs.executeService('/ILPBank/_Table', params, function (data, textStatus) {
            $("#ilpTableBody").html('');

            if (data.length != 0) {
                $.each(data, function (index, value) {
                    var trHtml = "<tr>";
                    trHtml += "<td>" + "<a href='#' onclick='fpcs.ILP.copyFromBank(" + value.ILPBankId + "); return false;'><div class='ui-pg-div'><span class='ui-icon icon-exchange blue'></span></div></a>" + "</td>";
                    trHtml += "<td>" + "<a href='#' onclick='fpcs.ILP.infoILPBank(" + value.ILPBankId + "); return false;'><div class='ui-pg-div'><span class='ui-icon icon-zoom-in grey'></span></div></a>" + "</td>";
                    trHtml += "<td class='ilpBankId' style='display:none'>" + value.ILPBankId + "</td>";
                    trHtml += "<td>" + value.Name + "</td>";
                    trHtml += "<td>" + value.Teacher + "</td>";
                    trHtml += "<td style='display:none'>" + value.Guardian + "</td>";
                    trHtml += "<td>" + value.Subject + "</td>";
                    trHtml += "<td>" + value.Year + "</td>";
                    trHtml += "</tr>";

                    $("#ilpTableBody").append(trHtml);
                });
            }
            else {
                var divTable = $(".ilp_bank_div");

                $(divTable).empty();
                $(divTable).html('<div class="no_ILP_mesage">No ILP at the moment</div>');

                $(divTable).removeClass('ilp_bank_div');
            }

            //var $table = $('.ilp_bank_div table'),
            //    $bodyCells = $table.find('tbody tr:first').children(),
            //    colWidth;

            //$(window).resize(function () {
            //    colWidth = $bodyCells.map(function () {
            //        return $(this).width();
            //    }).get();

            //    $table.find('thead tr').children().each(function (i, v) {
            //        $(v).width(colWidth[i]);
            //    });
            //}).resize();
        });
    },

    infoILPBank: function (id) {
        fpcs.getPartial('/ILP/_ILPInfo/' + id, function (data, textStatus) {
            $("#infoILPContent").html(data);

            var dialog = $("#infoILPDialog").dialog({
                resizable: false,
                draggable: false,
                modal: true,
                title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>Info Course Description Bank Record</h4></div>",
                title_html: true,
                width: "50%",
                position: ['top', 0]
            });
        });
    },

    initILPBankGrid: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".ilpBankGridWrapper",
            gridSelector: "#ilpBankGridTable",
            pagerSelector: "#ilpBankGridPager",
            showEditButton: false,
            showDeleteButton: false,
            url: "/ILPBank/_Index",
            sortname: 'Name',
            jsonReader: {
                repeatitems: false,
                id: "ILPBankId"
            },
            colNames: ['ID', 'Name', 'Actions'],
            colModel: [
				{ name: 'ILPBankId', index: 'ILPBankId', key: true, hidden: true, width: 60 },
				{ name: 'Name', index: 'Name', width: 120 },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false },
            ],
            rowButtons: [{ title: "Select the Course Description", rowClass: "gridRowSelectILP", rowIcon: "icon-plus-sign green" }]
        });
        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar();
        fpcs.jqGrid.initNavButtons(null, null);
    },

    copyFromBank: function (ilpBankId) {
        var params = {
            id: ilpBankId
        };

        fpcs.executeService('/ILPBank/GetILP', params, function (data, textStatus) {
            $("#CourseHrs").val(data.CourseHrs);
            $("#DescriptionCourse").val(data.DescriptionCourse);
            $("#Standards").val(data.Standards);
            $("#StudentActivities").val(data.StudentActivities);
            $("#MaterialsResources").val(data.MaterialsResources);
            $("#RoleAnyPeople").val(data.RoleAnyPeople);
            $("#EvaluationGradingPassFail").prop('checked', data.EvaluationGradingPassFail);
            $("#EvaluationGradingGradingScale").prop('checked', data.EvaluationGradingGradingScale);
            $("#EvaluationGradingOSN").prop('checked', data.EvaluationGradingOSN);
            $("#EvaluationGradingOther").prop('checked', data.EvaluationGradingOther);
            $("#EvaluationGradingOtherExplain").val(data.EvaluationGradingOtherExplain);
            $("#EvaluatedMeasurableOutcomes").val(data.EvaluatedMeasurableOutcomes);
            $("#CourseSyllabus").val(data.CourseSyllabus);
            $("#GuardianILPModifications").val(data.GuardianILPModifications);
            $("#InstructorILPModifications").val(data.InstructorILPModifications);

            fpcs.ILP.initChecked();
        });
    },

    initActionCreateGoodService: function () {
        $(document).off("click", ".createILP");
        $(document).on("click", ".createILP", function (e) {
            e.preventDefault();
            fpcs.sendForm("createILPForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.fpcsCourse.reloadGrid();
                    fpcs.closeDialog();
                    fpcs.studentPacket2.reloadPage();
                }
                else {
                    fpcs.showDialog("Create FPCS Course", data);
                }
            });
        });

        $(document).off("click", ".cancelILP");
        $(document).on("click", ".cancelILP", function (e) {
            fpcs.closeDialog();
        });
    },

    initPrint: function () {
        var id = $("#ILPId").val();
        if (id != 0) {
            $(document).off("click", ".printILP");
            $(document).on("click", ".printILP", function (e) {
                fpcs.getPartial('/ILP/_ILPPrint/' + id, function (data, textStatus) {
                    fpcs.showDialog("Print Form", data);
                });
            });
        }
        else {
            $(".printILP").hide();
        }
    }
}