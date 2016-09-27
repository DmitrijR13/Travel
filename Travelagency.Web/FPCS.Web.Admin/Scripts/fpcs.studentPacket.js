fpcs.studentPacket = {

    initIndexPage: function () {
        fpcs.studentPacket.initSponsorTeacherEdit();
        fpcs.studentPacket.initPlanCourseDialog();
        fpcs.studentPacket.initDeleteStudentPacketCourse();
        fpcs.studentPacket.initShowDetailsFPCSStudentPacketCourse();
        fpcs.studentPacket.initShowDataFPCSStudentPacketCourse();

        fpcs.studentPacket.initBtnShowPlanCourseDialog();
        
        fpcs.studentPacket.hideActualSpendingColumn();

        $(document).off("change", "#goalEnrollmentPercent");
        $(document).on("change", "#goalEnrollmentPercent", function (e) {
            fpcs.executeService(
                '/StudentPacket/ChangeGoalEnrollment',
                {
                    studentId: $("#StudentId").val(),
                    percentagePlanningEnroll: $("#goalEnrollmentPercent").val()
                },
                function () {
                    location.href = "/StudentPacket/Index/" + $("#StudentId").val();
                });
        });

        if (fpcs.studentPacket.getIsLocked()) {
            $("#goalEnrollmentPercent").prop('disabled', true);
            $("#sponsorTeacherEdit").prop('disabled', true);
            $("#showPlanCourseDialog").prop('disabled', true);
        }
        else {
            $("#goalEnrollmentPercent").prop('disabled', false);
            $("#sponsorTeacherEdit").prop('disabled', false);
            $("#showPlanCourseDialog").prop('disabled', false);
        }

        if (fpcs.getIsAdmin()) {
            if ($("#unlockedPlanCourseDialog") != undefined)
                $("#unlockedPlanCourseDialog").prop('disabled', false);
            if ($("#lockedPlanCourseDialog") != undefined)
                $("#lockedPlanCourseDialog").prop('disabled', false);
        }
        else {
            if ($("#unlockedPlanCourseDialog") != undefined)
                $("#unlockedPlanCourseDialog").prop('disabled', true);
            if ($("#lockedPlanCourseDialog") != undefined)
                $("#lockedPlanCourseDialog").prop('disabled', true);

            $("#goalEnrollmentPercent").prop('disabled', true);
        }

        if (fpcs.getIsTeacher()) {
            $("#goalEnrollmentPercent").prop('disabled', true);
            $("#sponsorTeacherEdit").prop('disabled', true);
        }

        if (fpcs.getIsGuardian()) {
            $("#goalEnrollmentPercent").prop('disabled', true);
            $("#sponsorTeacherEdit").prop('disabled', true);           
        }

        if (!fpcs.studentPacket.getIsASDTASigned() && fpcs.getIsGuardian() && !fpcs.studentPacket.getIsLocked()) {
            $("#showASDTestingAgreementDialog").show();
            $("spnIsASDTA").hide();
        }
        else {
            $("#showASDTestingAgreementDialog").hide();
            $("spnIsASDTA").show();
        }

        if (!fpcs.studentPacket.getIsPRASigned() && fpcs.getIsGuardian() && !fpcs.studentPacket.getIsLocked()) {
            $("#showProgressReportAgreementDialog").show();
            $("spnIsPRA").hide();
        }
        else {
            $("#showProgressReportAgreementDialog").hide();
            $("spnIsPRA").show();
        }
        $("#editILPPhilosophyDialog").show();
        $("[data-type='hide']").off('click');
        $("[data-type='hide']").on('click', function () {
            $(this).hide();
            $(this).siblings("[data-type='show']").show();
            $(this).siblings(".flt-right-title-money").show();

            var id = $(this).attr("data-id");
            $('[data-tbl-course="tblCourse_' + id + '"]').hide();
        });

        $("[data-type='show']").off('click');
        $("[data-type='show']").on('click', function () {
            $(this).hide();
            $(this).siblings("[data-type='hide']").show();
            $(this).siblings(".flt-right-title-money").hide();

            var id = $(this).attr("data-id");
            $('[data-tbl-course="tblCourse_' + id + '"]').show();
        });

        $("#hideStudentPacketCourse").off('click');
        $("#hideStudentPacketCourse").on('click', function () {
            $("#hideStudentPacketCourse").hide();
            $("#showStudentPacketCourse").show();

            $("[data-type='hide']").trigger('click');
        });

        $("#showStudentPacketCourse").off('click');
        $("#showStudentPacketCourse").on('click', function () {
            $("#showStudentPacketCourse").hide();
            $("#hideStudentPacketCourse").show();

            $("[data-type='show']").trigger('click');
        });
    },

    hideActualSpendingColumn: function () {
        if (!fpcs.getIsAdmin()) {
            var tdsActualSpendingColumn = $(".actual_spending_column");
            $.each(tdsActualSpendingColumn, function (index, value) {
                $(value).hide();
            });
        }
        else {
            var tdsActualSpendingColumn = $(".actual_spending_column");
            $.each(tdsActualSpendingColumn, function (index, value) {
                $(value).show();
            });
        }
    },

    initSponsorTeacherEdit: function () {
        $(document).off("click", "#sponsorTeacherEdit");
        $(document).on("click", "#sponsorTeacherEdit", function (e) {
            var id = $(this).attr("packetId");
            fpcs.getPartial('/StudentPacket/_SponsorTeacherEdit/' + id, function (data, textStatus) {
                var copy = $("#sponsorTeacherWrap").html();
                $("#sponsorTeacherWrapCopy").html(copy);
                $("#sponsorTeacherWrap").html(data);
            })
        });

        $(document).off("click", "#sponsorTeacherCancel");
        $(document).on("click", "#sponsorTeacherCancel", function (e) {
            var copy = $("#sponsorTeacherWrapCopy").html();
            $("#sponsorTeacherWrap").html(copy);
            return false;
        });

        $(document).off("click", "#sponsorTeacherSend");
        $(document).on("click", "#sponsorTeacherSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("sponsorTeacherEditForm", function (data, textStatus) {
                $("#sponsorTeacherWrap").html(data);
            });
        });
    },

    initPlanCourseDialog: function () {
        $(document).off("click", "#editILPPhilosophyDialog");
        $(document).on("click", "#editILPPhilosophyDialog", function (e) {
            var studentId = $("#StudentId").val();
            fpcs.getPartial('/Student/_EditILPPhilosophy/' + studentId, function (data, textStatus) {
                fpcs.showDialog("Print form", data);
                fpcs.student.initEditDialog();
            });
        });

        $(document).off("click", "#showPlanCourseDialogUp, #showPlanCourseDialogDown, #showPlanCourseDialogMiddle");
        $(document).on("click", "#showPlanCourseDialogUp, #showPlanCourseDialogDown, #showPlanCourseDialogMiddle", function (e) {
            var dialog = $("#planCourseDialog").dialog({
                resizable: false,
                draggable: false,
                modal: true,
                title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>Add New Course</h4></div>",
                title_html: true,
                width: "75%"
            });
            var studentId = $("#StudentId").val();
            var studentPacketId = $("#StudentPacketId").val();
            var sponsorId = $("#sponsorId").val();
            fpcs.studentPacket.initPlanCourseGrig(studentId, studentPacketId, sponsorId);
        });
        
        $(document).off("click", "#showAddCourseDialogUp, #showAddCourseDialogDown");
        $(document).on("click", "#showAddCourseDialogUp, #showAddCourseDialogDown", function (e) {
            fpcs.getPartial('/FPCSCourse/_Create', function (data, textStatus) {
                fpcs.showDialog("Create FPCS Course", data);
                fpcs.fpcsCourse.initCreateFPCSCourseSend();
                fpcs.fpcsCourse.initTeacherGuardianOpen();
            });
        });

        $(document).off("click", "#printStudentPacket");
        $(document).on("click", "#printStudentPacket", function (e) {
            var studentId = $("#StudentId").val();
            fpcs.getPartial('/StudentPacket/_Print/' + studentId, function (data, textStatus) {
                fpcs.showDialog("Print form", data);
                fpcs.studentPacket.hideActualSpendingColumn();
            });
        });

        $(document).off("click", "#printReimbursement");
        $(document).on("click", "#printReimbursement", function (e) {
            var studentId = $("#StudentId").val();
            fpcs.getPartial('/StudentPacket/_PrintReimbursement/' + studentId, function (data, textStatus) {
                fpcs.showDialog("Print form", data);
            });
        });

        $(document).off("click", "#showASDTestingAgreementDialog");
        $(document).on("click", "#showASDTestingAgreementDialog", function (e) {
            var studentPacketId = $("#StudentPacketId").val();
            fpcs.getPartial('/StudentPacket/_ASDTestingAgreement/' + studentPacketId, function (data, textStatus) {
                fpcs.showDialog("ASD Testing Agreement", data);
            });
        });

        $(document).off("click", "#showProgressReportAgreementDialog");
        $(document).on("click", "#showProgressReportAgreementDialog", function (e) {
            var studentPacketId = $("#StudentPacketId").val();
            fpcs.getPartial('/StudentPacket/_ProgressReportAgreement/' + studentPacketId, function (data, textStatus) {
                fpcs.showDialog("Progress Report Agreement", data);
            });
        });

        $(document).off("click", "#refreshPlanCourseDialog");
        $(document).on("click", "#refreshPlanCourseDialog", function (e) {
            location.href = "/StudentPacket/Index/" + $("#StudentId").val();
        });

        $(document).off("click", "#lockedPlanCourseDialog");
        $(document).on("click", "#lockedPlanCourseDialog", function (e) {
            location.href = "/StudentPacket/Locked/" + $("#StudentId").val();
        });

        $(document).off("click", "#unlockedPlanCourseDialog");
        $(document).on("click", "#unlockedPlanCourseDialog", function (e) {
            location.href = "/StudentPacket/Unlocked/" + $("#StudentId").val();
        });
    },

    initShowDetailsFPCSStudentPacketCourse: function () {
        $(document).off("click", ".detailsFPCSStudentPacketCourse");
        $(document).on("click", ".detailsFPCSStudentPacketCourse", function (e) {
            e.preventDefault();
            var fpcsCourseId = $(this).closest("tr").find("#FPCSCourseId").val();
            fpcs.fpcsCourse.showDetailsDialog(fpcsCourseId);
        });
    },

    initShowDataFPCSStudentPacketCourse: function () {
        $(document).off("click", ".dataFPCSStudentPacketCourse");
        $(document).on("click", ".dataFPCSStudentPacketCourse", function (e) {
            e.preventDefault();
            var studentPacketCourseId = $(this).closest("tr").find("#StudentPacketCourseId").val();
            //fpcs.dataStudentPacket.showDetailDialog(studentPacketCourseId);

            fpcs.studentPacket.isCanEditStudentPacketCourse(this, studentPacketCourseId);
        });
    },

    initDeleteStudentPacketCourse: function () {
        var btnDeletes = $(".deleteStudentPacketCourse");
        $.each(btnDeletes, function (index, val) {
            fpcs.studentPacket.isCanDeleteStudentPacketCourse(val);
        });

        $(document).off("click", ".deleteStudentPacketCourse");
        $(document).on("click", ".deleteStudentPacketCourse", function (e) {
            e.preventDefault();
            var studentPacketCourseId = $(this).closest("tr").find("#StudentPacketCourseId").val();
            var url = "/StudentPacket/DeleteStudentPacketCourse";
            fpcs.executeServiceWithConfirm(url, { studentPacketCourseId: studentPacketCourseId }, function (data) {
                if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 200) {
                    location.href = "/StudentPacket/Index/" + $("#StudentId").val();
                }
                else if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 500) {
                    fpcs.showErrorMessage(data.Message);
                }
            });
        });
    },

    initPlanCourseGrig: function (studentId, studentPacketId, sponsorId) {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".planCourseGridWrapper",
            gridSelector: "#planCourseGridTable",
            pagerSelector: "#planCourseGridPager",
            multiselect: false,
            showEditButton: false,
            showDeleteButton: false,
            url: "/StudentPacket/_FPCSCourses?studentId=" + studentId + "&sponsorId=" + sponsorId + "&studentPacketId=" + studentPacketId,
            sortname: 'Name',
            jsonReader: {
                repeatitems: false,
                id: "FPCSCourseId"
            },
            colNames: ['ID', 'Name', 'Teacher', 'Guardian', 'Subject', 'Semester', 'Actions'],
            colModel: [
				{ name: 'FPCSCourseId', index: 'FPCSCourseId', key: true, hidden: true, width: 60 },
				{ name: 'Name', index: 'Name', width: 120 },
                { name: 'Teacher', index: 'Teacher', width: 120 },
                { name: 'Guardian', index: 'Guardian', width: 120 },
                { name: 'Subject', index: 'Subject', width: 60, stype: "select", searchoptions: { value: $("#subjectSearchOptions").val() } },
				{ name: 'SemesterStr', index: 'SemesterStr', search: false, width: 60 },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false },
            ],
            rowButtons: [{ title: "Select the Course", rowClass: "gridRowAddFPCSCourse", rowIcon: "icon-plus-sign green" }]
        });
        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar();
        fpcs.jqGrid.initNavButtons(null, null);

        fpcs.fpcsCourse.initDetailsDialog();
        fpcs.studentPacket.initAddFPCSStudentPacketCourse();
    },

    initAddFPCSStudentPacketCourse: function () {
        $(document).off("click", ".gridRowAddFPCSCourse");
        $(document).on("click", ".gridRowAddFPCSCourse", function (e) {
            var fpcsCourseId = $(this).attr("rowid");
            var studentPacketId = $("#StudentPacketId").val();
            var url = "/StudentPacket/AddFPCSStudentPacketCourse";
            fpcs.executeService(url, { fpcsCourseId: fpcsCourseId, studentPacketId: studentPacketId }, function (data) {
                if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 200) {
                    location.href = "/StudentPacket/Index/" + $("#StudentId").val();
                }
                else if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 500) {
                    $("#planCourseDialog").dialog("close");
                    fpcs.showErrorMessage(data.Message);
                }
            });
        });
    },

    initBtnShowPlanCourseDialog: function () {
        // If it isn't admin and count course more or equal 14
        if ($("#roleCurrentUser").val() * 1 != 1 && $("#cntCourses").val() * 1 >= 14) {
            $("#showPlanCourseDialog").prop('disabled', true);
        }
    },

    initASDTAAgreementPage: function () {
        var btns = $(".asdTASignClick");

        $.each(btns, function (index, item) {
            if (!fpcs.getIsGuardian() || fpcs.studentPacket.getIsLocked()) {
                $(item).hide();
            }
            else {
                $(item).show();
            }
        });
    },

    initPRAAgreementPage: function () {
        var btns = $(".praSignClick");

        $.each(btns, function (index, item) {
            if (!fpcs.getIsGuardian() || fpcs.studentPacket.getIsLocked()) {
                $(item).hide();
            }
            else {
                $(item).show();
            }
        });
    },

    clickASDTAAgreement: function (studentId) {
        fpcs.executeService(
            '/StudentPacket/SignASDTestingAgreement',
            {
                studentId: studentId
            },
            function () {
                location.href = "/StudentPacket/Index/" + $("#StudentId").val();
            }
        );
    },

    clickPRAAgreement: function (studentId) {
        fpcs.executeService(
            '/StudentPacket/SignProgressReportAgreement',
            {
                studentId: studentId
            },
            function () {
                location.href = "/StudentPacket/Index/" + $("#StudentId").val();
            }
        );
    },

    isCanEditStudentPacketCourse: function (btn, studentPacketCourseId) {
        var adminSignatureInt = $(btn).closest("tr").find("#AdminSignatureInt").val() * 1;
        var instructorId = $(btn).closest("tr").find("#InstructorSignatureGuid").val();
        var sponsorId = $("#sponsorId").val();

        // If admin signature equal Sign and role current user isn't Admin
        // OR
        // If user is teacher and isn't sposnsor packet course and isn't instructor course
        if (((adminSignatureInt == 30 && !fpcs.getIsAdmin()) || fpcs.studentPacket.getIsLocked()) ||
            (fpcs.getIsTeacher() &&
             $("#idCurrentUser").val() != sponsorId &&
             $("#idCurrentUser").val() != instructorId)) {
            fpcs.dataStudentPacket.showReviewDialog(studentPacketCourseId);
        }
        else {
            fpcs.dataStudentPacket.showDetailDialog(studentPacketCourseId);
        }
    },

    isCanDeleteStudentPacketCourse: function (btn) {
        var adminSignatureInt = $(btn).closest("tr").find("#AdminSignatureInt").val() * 1;
        var instructorId = $(btn).closest("tr").find("#InstructorSignatureGuid").val();
        var sponsorId = $("#sponsorId").val();

        // If admin signature equal Sign and role current user isn't Admin
        // OR
        // If user is teacher and isn't sposnsor packet course and isn't instructor course
        if (((adminSignatureInt == 30 && !fpcs.getIsAdmin()) || fpcs.studentPacket.getIsLocked()) ||
            (fpcs.getIsTeacher() &&
             $("#idCurrentUser").val() != sponsorId &&
             $("#idCurrentUser").val() != instructorId)) {
            $(btn).hide();
        }
        else
        {
            $(btn).show();
        }
    },

    getIsLocked: function () {
        return $("#isLocked").val() == "True";
    },

    getIsASDTASigned: function () {
        return $("#isASDTASigned").val() == "True";
    },

    getIsPRASigned: function () {
        return $("#isPRASigned").val() == "True";
    },

    reloadPage: function () {
        if ($("#StudentId").val() != null && $("#StudentId").val() != undefined) {
            location.href = "/StudentPacket/Index/" + $("#StudentId").val();
        }
    },

    printReimbursement: function () {
        var total = $("#hidTotalReimbursement").val();

        var items = $(".cbSelectedReimbursement:not(:checked)");
        $.each(items, function (index, item) {
            $(item).parent().parent().hide();
            total -= $(item).siblings('input[type=hidden]').val();
        });

        $("#totalReimbursement").html("$" + total + "&nbsp;");
        $("#instruction").hide();
        $("#infoProcedures").show();
        $("#infoCheckPayable").show();

        var itemsCbColumn = $(".cbColumn");
        $.each(itemsCbColumn, function (index, item) {
            $(item).hide();
        });

        fpcs.print('print');

        $.each(items, function (index, item) {
            $(item).parent().parent().show();
        });

        $("#totalReimbursement").html("$" + $("#hidTotalReimbursement").val() + "&nbsp;");
        $("#instruction").show();
        $("#infoCheckPayable").hide();
        $("#infoProcedures").hide();

        $.each(itemsCbColumn, function (index, item) {
            $(item).show();
        });
    }
}