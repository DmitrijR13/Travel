fpcs.student = {

    initIndexPage: function () {
        debugger;
        var teacherId = $("#ddlTeacher option:selected").val();
        var fpcsCourseId = $("#ddlFPCSCourse option:selected").val();

        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "Student",
            url: "/Fiz/_Index",
            rowNum: 100000,
            showEditButton: !fpcs.getIsTeacher(),
            showDeleteButton: !fpcs.getIsTeacher() && !fpcs.getIsGuardian(),
            sortname: 'FullName',
            postData: { teacherId: teacherId, fpcsCourseId: fpcsCourseId },
            jsonReader: {
                repeatitems: false,
                id: "DbUserId"
            },
            colNames: ['ID', 'Name', 'Guardians', 'Phone', 'Email', 'Sex', 'Grade', 'Enrollment Status', 'Enrollment Date', 'Withdrawal Date', 'Zangle ID', 'Is Locked', 'Actions'],
            colModel: [
				{ name: 'DbUserId', index: 'DbUserId', key: true, hidden: true },
				{
				    name: 'FullName', index: 'FullName', width: 100, formatter: function (cellvalue, options, rowObject) {
				        var withdrawalDate = rowObject["WithdrawalDate"];
				        if (withdrawalDate != "") {
				            return "<span style='color: red;'>" + cellvalue + "</span>";
				        }
				        return cellvalue;
				    }
				},
                {
                    name: 'Guardians', index: 'Guardians', width: 65,
                    sortable: false
                },
                {
                    name: 'Phone', index: 'Phone', width: 70,
                    sortable: false
                },
				{ name: 'Email', index: 'Email', width: 90 },
                {
                    name: 'Sex', index: 'Sex', width: 80,
                    stype: "select",
                    searchoptions: {
                        value: ":All;" + $("#sexs").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
                {
                    name: 'Grade', index: 'Grade', width: 60,
                    stype: "select",
                    searchoptions: {
                        value: ":All;" + $("#grades").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
                {
                    name: 'EnrollmentStatus', index: 'EnrollmentStatus', width: 70,
                    stype: "select",
                    searchoptions: {
                        value: ":All;" + $("#enrollmentStatuses").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
                { name: 'EnrollmentDate', index: 'EnrollmentDate', width: 60, sortable: false, search: false },
                { name: 'WithdrawalDate', index: 'WithdrawalDate', width: 60, sortable: false, search: false },
                { name: 'ZangleID', index: 'ZangleID', width: 60, sortable: false, hidden: true },
                { name: 'IsLocked', index: 'IsLocked', width: 40, search: false, hidden: true },
				{ name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false },
            ],
            rowButtons: [
                {
                    title: "Student Packet Manager", rowClass: "gridRowStudentPacket2", rowIcon: "icon-suitcase green"
                }//,
                //!fpcs.getIsTeacher() ?
                    //{ title: "Transfer Manager", rowClass: "gridRowStudentTransfer", rowIcon: "icon-dollar green" } :
                    //null
            ],

            ondblClickRow: function (id) {
                $("div.gridRowStudentPacket2[rowid='" + id + "']").trigger('click');
            }
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("Student");

        if (!fpcs.getIsTeacher() && !fpcs.getIsGuardian()) {
            fpcs.jqGrid.initNavButtons("/Student/DeleteAll", fpcs.student.showCreateDialog, "Add new student");
        }

        fpcs.jqGrid.initNavPrintButton(fpcs.student.initPrint);

        fpcs.student.initDetailsDialog();
        fpcs.student.initCreateDialogSend();
        fpcs.student.initEditDialog();
        fpcs.student.initDeleteOneEntity();
        fpcs.student.initStudentPacketButton();
        fpcs.student.initTransferButton();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("Student");
        });

        $("#ddlStudent").chosen({ allow_single_deselect: true, width: '200px' });
        $("#ddlStudent").off('change');
        $("#ddlStudent").on('change', function () {
            $("#gridTable").setGridParam({ postData: { studentId: $("#ddlStudent option:selected").val() } });
            $("#gridTable").trigger("reloadGrid");
        });

        $("#ddlTeacher").off('change');
        $("#ddlTeacher").on('change', function () {
            $("#gridTable").setGridParam({ postData: { teacherId: $("#ddlTeacher option:selected").val() } });
            $("#gridTable").trigger("reloadGrid");
        });

        $("#ddlFPCSCourse").off('change');
        $("#ddlFPCSCourse").on('change', function () {
            $("#gridTable").setGridParam({ postData: { fpcsCourseId: $("#ddlFPCSCourse option:selected").val() } });
            $("#gridTable").trigger("reloadGrid");
        });
    },

    initPrint: function () {
        var params = jQuery("#gridTable").jqGrid('getGridParam', 'postData');
        fpcs.getPartialThroughPost('/Student/_Print/', params, function (data, textStatus) {
            fpcs.showDialog("Print Form", data);
        });
    },

    showDetailsDialog: function (id) {
        fpcs.getPartial('/Student/_Details/' + id, function (data, textStatus) {
            fpcs.showDialog("Student details", data);
        });
    },

    initDetailsDialog: function () {
        $(document).on("click", ".gridRowDetails", function (e) {
            var id = $(this).attr("rowid");
            fpcs.student.showDetailsDialog(id);
        });
    },

    showCreateDialog: function () {
        fpcs.getPartial('/Student/_Create/', function (data, textStatus) {
            fpcs.showDialog("Create Student", data);
        });
    },

    initCreateDialogSend: function () {
        $(document).off("click", ".createStudentSend");
        $(document).on("click", ".createStudentSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createStudentForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.student.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Create Student", data);
                }
            });
        });
    },

    showEditDialog: function (id) {
        fpcs.getPartial('/Student/_Edit/' + id, function (data, textStatus) {
            fpcs.showDialog("Edit Student", data);

            if (!fpcs.getIsAdmin()) {
                $("#PercentagePlanningEnroll").prop("readonly", true);
                $("#PercentagePlanningEnroll").prop("disabled", true);
            }

            if (fpcs.getIsGuardian()) {
                $("#FirstName").prop("readonly", true);
                $("#LastName").prop("readonly", true);
                $("#MiddleInitial").prop("readonly", true);
                $("#Grade").prop("readonly", true);
                $("#Grade").prop("disabled", true);
                $("#enrollmentStatus").prop("readonly", true);
                $("#enrollmentStatus").prop("disabled", true);
            }
            else {
                $("#FirstName").prop("readonly", false);
                $("#LastName").prop("readonly", false);
                $("#MiddleInitial").prop("readonly", false);
                $("#Grade").prop("readonly", false);
                $("#Grade").prop("disabled", false);
                $("#enrollmentStatus").prop("readonly", false);
                $("#enrollmentStatus").prop("disabled", false);
            }
        });
    },

    initEditDialog: function () {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fpcs.student.showEditDialog(id);
        });

        $(document).off("click", ".editStudentSend");
        $(document).on("click", ".editStudentSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editStudentForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.student.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit Student", data);
                }
            });
        });

        $(document).off("click", ".editStudentIEPSend");
        $(document).on("click", ".editStudentIEPSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editStudentIEPForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.student.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit IEP Student", data);
                }
            });
        });

        $(document).off("click", ".editStudentILPPhilosophySend");
        $(document).on("click", ".editStudentILPPhilosophySend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editStudentILPPhilosophyForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.student.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit ILP Philosophy Student", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/Student/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fpcs.student.reloadGrid();
            });
        });
    },

    initStudentPacketButton: function () {
        $(document).off("click", ".gridRowStudentPacket");
        $(document).on("click", ".gridRowStudentPacket", function (e) {
            var id = $(this).attr("rowid");
            location.href = "/StudentPacket/Index/" + id;
        });

        $(document).off("click", ".gridRowStudentPacket2");
        $(document).on("click", ".gridRowStudentPacket2", function (e) {
            var id = $(this).attr("rowid");
            location.href = "/StudentPacket2/Index/" + id;
        });
    },

    initTransferButton: function () {
        $(document).off("click", ".gridRowStudentTransfer");
        $(document).on("click", ".gridRowStudentTransfer", function (e) {
            var id = $(this).attr("rowid");
            location.href = "/Transfer/Index/" + id;
        });
    },

    initCreateEditDialog: function() {
        fpcs.student.checkEnrollmentStatus();

        $(document).off("change", "#enrollmentStatus");
        $(document).on("change", "#enrollmentStatus", function (e) {
            fpcs.student.checkEnrollmentStatus();
        });
    },

    checkEnrollmentStatus: function() {
        var status = $("#enrollmentStatus").val();

        if (status == "ConditionallyEnrolled") {
            $("#enrollment_status_check").show();
        }
        else {
            $("#enrollment_status_check").hide();

            $("#isBirthCertificate").prop('checked', false);
            $("#isGradesNotSubmitted").prop('checked', false);
            $("#isILPPhilosophy").prop('checked', false);
            $("#isMedicalRelease").prop('checked', false);
            $("#isProgressReportSignature").prop('checked', false);
            $("#isShotRecords").prop('checked', false);
            $("#isTestingAgreement").prop('checked', false);
            $("#isOther").prop('checked', false);
        }
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }

}