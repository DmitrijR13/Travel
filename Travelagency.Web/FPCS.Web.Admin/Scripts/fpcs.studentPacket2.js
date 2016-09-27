fpcs.studentPacket2 = {

    initIndexPage: function () {
        //fpcs.studentPacket2.initSponsorSignatureEdit();
        //fpcs.studentPacket2.initSponsorTeacherEdit();
        //fpcs.studentPacket2.initZangleEdit();
        //fpcs.studentPacket2.initAmpElaEdit();
        //fpcs.studentPacket2.initAmpMathEdit();
        fpcs.studentPacket2.initPlanCourseDialog();
        fpcs.studentPacket2.initDeleteStudentPacketCourse();
        fpcs.studentPacket2.initShowDetailsFPCSStudentPacketCourse();
        fpcs.studentPacket2.initShowDataFPCSStudentPacketCourse();
        fpcs.studentPacket2.initShowFPCSCourseInfo();

        fpcs.studentPacket2.initBtnShowPlanCourseDialog();
        
        fpcs.studentPacket2.hideActualSpendingColumn();

        $(document).off("change", "#goalEnrollmentPercent");
        $(document).on("change", "#goalEnrollmentPercent", function (e) {
            fpcs.executeService(
                '/StudentPacket2/ChangeGoalEnrollment',
                {
                    studentId: $("#StudentId").val(),
                    percentagePlanningEnroll: $("#goalEnrollmentPercent").val()
                },
                function () {
                    fpcs.studentPacket2.reloadPage();
                });
        });

        if (fpcs.studentPacket2.getIsLocked()) {
            $("#goalEnrollmentPercent").prop('disabled', true);
            $("#sponsorTeacherEdit").hide();
            $("#spnSponsorTeacherEdit").show();
            $("#sponsorshipEdit").hide();
            $("#spnSponsorshipEdit").show();
            $("#sponsorSignatureSem1Edit").hide();
            $("#spnSponsorSignatureSem1Edit").show();
            $("#guardianSignatureSem1Edit").hide();
            $("#spnGuardianSignatureSem1Edit").show();
            $("#sponsorSignatureSem2Edit").hide();
            $("#spnSponsorSignatureSem2Edit").show();
            $("#guardianSignatureSem2Edit").hide();
            $("#spnGuardianSignatureSem2Edit").show();
            $("#ampElaEdit").hide();
            $("#spnAmpElaEdit").show();
            $("#ampMathEdit").hide();
            $("#spnAmpMathEdit").show();
            $("#a504Edit").hide();
            $("#spnA504Edit").show();
            $("#swdEdit").hide();
            $("#spnSWDEdit").show();
            $("#zangleEdit").hide();
            $("#spnZangleEdit").show();
            $("#stateEdit").hide();
            $("#spnStateEdit").show();
            $("#showPlanCourseDialog").prop('disabled', true);
        }
        else {
            $("#goalEnrollmentPercent").prop('disabled', false);
            $("#sponsorTeacherEdit").show();
            $("#spnSponsorTeacherEdit").hide();
            $("#sponsorshipEdit").show();
            $("#spnSponsorshipEdit").hide();
            $("#sponsorSignatureSem1Edit").show();
            $("#spnSponsorSignatureSem1Edit").hide();
            $("#guardianSignatureSem1Edit").show();
            $("#spnGuardianSignatureSem1Edit").hide();
            $("#sponsorSignatureSem2Edit").show();
            $("#spnSponsorSignatureSem2Edit").hide();
            $("#guardianSignatureSem2Edit").show();
            $("#spnGuardianSignatureSem2Edit").hide();
            $("#ampElaEdit").show();
            $("#spnAmpElaEdit").hide();
            $("#ampMathEdit").show();
            $("#spnAmpMathEdit").hide();
            $("#a504Edit").show();
            $("#spnA504Edit").hide();
            $("#swdEdit").show();
            $("#spnSWDEdit").hide();
            $("#zangleEdit").show();
            $("#spnZangleEdit").hide();
            $("#stateEdit").show();
            $("#spnStateEdit").hide();
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
            $("#sponsorTeacherEdit").hide();
            $("#spnSponsorTeacherEdit").show();
            $("#sponsorshipEdit").show();
            $("#spnSponsorshipEdit").hide();

            if ($("#sponsorTeacherId").val() == $("#currentUserId").val()) {
                $("#sponsorSignatureSem1Edit").show();
                $("#spnSponsorSignatureSem1Edit").hide();
                $("#guardianSignatureSem1Edit").show();
                $("#spnGuardianSignatureSem1Edit").hide();
                $("#sponsorSignatureSem2Edit").show();
                $("#spnSponsorSignatureSem2Edit").hide();
                $("#guardianSignatureSem2Edit").show();
                $("#spnGuardianSignatureSem2Edit").hide();
            }
            else {
                $("#sponsorSignatureSem1Edit").hide();
                $("#spnSponsorSignatureSem1Edit").show();
                $("#guardianSignatureSem1Edit").hide();
                $("#spnGuardianSignatureSem1Edit").show();
                $("#sponsorSignatureSem2Edit").hide();
                $("#spnSponsorSignatureSem2Edit").show();
                $("#guardianSignatureSem2Edit").hide();
                $("#spnGuardianSignatureSem2Edit").show();
            }

            $("#ampElaEdit").hide();
            $("#spnAmpElaEdit").show();
            $("#ampMathEdit").hide();
            $("#spnAmpMathEdit").show();
            $("#a504Edit").hide();
            $("#spnA504Edit").show();
            $("#swdEdit").hide();
            $("#spnSWDEdit").show();
            $("#zangleEdit").hide();
            $("#spnZangleEdit").show();
            $("#stateEdit").hide();
            $("#spnStateEdit").show();
            $("#familyMove").show();
            $("#spnFamilyMove").hide();
        }

        if (fpcs.getIsGuardian()) {
            $("#goalEnrollmentPercent").prop('disabled', true);
            $("#sponsorTeacherEdit").hide();
            $("#spnSponsorTeacherEdit").show();
            $("#sponsorshipEdit").show();
            $("#spnSponsorshipEdit").hide();
            $("#sponsorSignatureSem1Edit").hide();
            $("#spnSponsorSignatureSem1Edit").show();
            $("#sponsorSignatureSem2Edit").hide();
            $("#spnSponsorSignatureSem2Edit").show();

            if ($("#guardianSignatureSem1Edit").attr('data-signature') == 'Sign') {
                $("#guardianSignatureSem1Edit").hide();
                $("#spnGuardianSignatureSem1Edit").show();
            }
            else {
                $("#guardianSignatureSem1Edit").show();
                $("#spnGuardianSignatureSem1Edit").hide();
            }

            if ($("#guardianSignatureSem2Edit").attr('data-signature') == 'Sign') {
                $("#guardianSignatureSem2Edit").hide();
                $("#spnGuardianSignatureSem2Edit").show();
            }
            else {
                $("#guardianSignatureSem2Edit").show();
                $("#spnGuardianSignatureSem2Edit").hide();
            }

            $("#ampElaEdit").hide();
            $("#spnAmpElaEdit").show();
            $("#ampMathEdit").hide();
            $("#spnAmpMathEdit").show();
            $("#a504Edit").hide();
            $("#spnA504Edit").show();
            $("#swdEdit").hide();
            $("#spnSWDEdit").show();
            $("#zangleEdit").hide();
            $("#spnZangleEdit").show();
            $("#stateEdit").hide();
            $("#spnStateEdit").show();
            $("#familyMove").hide();
            $("#spnFamilyMove").show();

            fpcs.studentPacket2.checkSignedForGuardian();
        }
        
        if (!fpcs.studentPacket2.getIsASDTASigned() && fpcs.getIsGuardian() && !fpcs.studentPacket2.getIsLocked()) {
            $("#showASDTestingAgreementDialog").show();
            $("#spnIsASDTA").hide();
        }
        else {
            $("#showASDTestingAgreementDialog").hide();
            $("#spnIsASDTA").show();
        }

        if (!fpcs.studentPacket2.getIsPRASigned() && fpcs.getIsGuardian() && !fpcs.studentPacket2.getIsLocked()) {
            $("#showProgressReportAgreementDialog").show();
            $("#spnIsPRA").hide();
        }
        else {
            $("#showProgressReportAgreementDialog").hide();
            $("#spnIsPRA").show();
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

        $("#showSemester1").off('click');
        $("#showSemester1").on('click', function () {
            $(this).removeClass('btn-print');
            $(this).addClass('btn-success');
            $("#showSemester2").removeClass('btn-success');
            $("#showSemester2").addClass('btn-print');
            $("#showSummer").removeClass('btn-success');
            $("#showSummer").addClass('btn-print');

            $('table.table-summer').hide();
            $('table.table-semester2').hide();
            $('table.table-semester1').show();

            $('.create-add-course-summer').hide();
            $('.create-add-course-sem2').hide();
            $('.create-add-course-sem1').show();

            $('.signature-summer').hide();
            $('.signature-semester2').hide();
            $('.signature-semester1').show();

            $("#hdnNumberSemester").val(1);
        });

        $("#showSemester2").off('click');
        $("#showSemester2").on('click', function () {
            $(this).removeClass('btn-print');
            $(this).addClass('btn-success');
            $("#showSummer").removeClass('btn-success');
            $("#showSummer").addClass('btn-print');
            $("#showSemester1").removeClass('btn-success');
            $("#showSemester1").addClass('btn-print');

            $('table.table-summer').hide();
            $('table.table-semester1').hide();
            $('table.table-semester2').show();

            $('.create-add-course-summer').hide();
            $('.create-add-course-sem1').hide();
            $('.create-add-course-sem2').show();

            $('.signature-summer').hide();
            $('.signature-semester1').hide();
            $('.signature-semester2').show();
            
            $("#hdnNumberSemester").val(2);
        });

        $("#showSummer").off('click');
        $("#showSummer").on('click', function () {
            $(this).removeClass('btn-print');
            $(this).addClass('btn-success');
            $("#showSemester2").removeClass('btn-success');
            $("#showSemester2").addClass('btn-print');
            $("#showSemester1").removeClass('btn-success');
            $("#showSemester1").addClass('btn-print');

            $('table.table-semester2').hide();
            $('table.table-semester1').hide();
            $('table.table-summer').show();

            $('.create-add-course-sem2').hide();
            $('.create-add-course-sem1').hide();
            $('.create-add-course-summer').show();

            $('.signature-semester2').hide();
            $('.signature-semester1').hide();
            $('.signature-summer').show();

            $("#hdnNumberSemester").val(3);
        });

        $("#studentMove").off('click');
        $("#studentMove").on('click', function () {
            var id = $(this).attr("data-id");
            fpcs.getPartial('/Student/_Details/' + id, function (data, textStatus) {
                fpcs.showDialog("Student details", data);
            });
        });

        $("#familyMove").off('click');
        $("#familyMove").on('click', function () {
            var id = $(this).attr("data-id");

            if (fpcs.getIsTeacher()) {
                location.href = "/Family/EditForTeacher/" + id;
            }
            else {
                location.href = "/Family/Edit/" + id;
            }
        });

        $('.xedt').editable({
            source: [
                { value: 'A', text: 'A' },
                { value: 'B', text: 'B' },
                { value: 'C', text: 'C' },
                { value: 'D', text: 'D' },
                { value: 'F', text: 'F' },
                { value: 'I', text: 'I' },
                { value: 'P', text: 'P' },
                { value: 'O', text: 'O' },
                { value: 'S', text: 'S' },
                { value: 'N', text: 'N' }
            ],
            callback: function (sValue, y) {
            }
        });

        var edtQtrEditable = $('.edtQtrEditable');
        $.each(edtQtrEditable, function (index, value) {
            var data_mark = $(value).attr("data-mark");
            var data_comment = $(value).attr("data-comment");
            var data_lock = $(value).attr("data-lock");
            var data_admin = $(value).attr("data-admin");

            $(value).editable({
                url: '/post',
                value: {
                    lockVal: data_lock,
                    adminVal: data_admin,
                    markVal: data_mark,
                    commentVal: data_comment
                },
                success: function (response, newValue) {
                    var img = $(this).parent().find('img');
                    var title = newValue.commentVal;
                    $(img).attr('title', title);
                    if (title == null || title == '' || title == 'Credit:') {
                        $(img).hide();
                    }
                    else {
                        $(img).show();
                    }
                }
            });
        });

        var edtSemEditable = $('.edtSemEditable');
        $.each(edtSemEditable, function (index, value) {
            var data_credit = $(value).attr("data-credit");
            var data_mark = $(value).attr("data-mark");
            var data_lock = $(value).attr("data-lock");
            var data_admin = $(value).attr("data-admin");
            var data_comment = $(value).attr("data-comment");

            $(value).editable({
                url: '/post',
                value: {
                    creditVal: data_credit,
                    markVal: data_mark,
                    lockVal: data_lock,
                    adminVal: data_admin,
                    commentVal: data_comment
                },
                success: function (response, newValue) {
                    var img = $(this).parent().find('img');
                    var title = newValue.commentVal + ' Credit: ' + newValue.creditVal;
                    $(img).attr('title', title);
                    if (title == null || title == '' || title == 'Credit:') {
                        $(img).hide();
                    }
                    else {
                        $(img).show();
                    }
                }
            });
        });

        var srcAmpElas = $("#jsonAmpElas").val();
        var edtAmpEditable = $('.edtAmpEditable');
        $.each(edtAmpEditable, function (index, value) {
            var data_mark = $(value).attr("data-mark");
            var data_comment = $(value).attr("data-comment");

            $(value).editable({
                url: '/post',
                value: {
                    markVal: data_mark,
                    commentVal: data_comment
                },
                source: srcAmpElas,
                success: function (response, newValue) {
                    var img = $(this).parent().find('img');
                    var title = newValue.commentVal;
                    $(img).attr('title', title);
                    if (title == null || title == '') {
                        $(img).hide();
                    }
                    else {
                        $(img).show();
                    }
                }
            });
        });

        $('.xrpt').editable({
            source: [
                { value: '1', text: 'Yes' },
                { value: '2', text: 'No' }
            ],
            callback: function (sValue, y) {
            }
        });

        $('.xsys').editable({
            source: [
                { value: '1', text: 'Yes' },
                { value: '2', text: 'No' }
            ],
            callback: function (sValue, y) {
            }
        });

        $('.edta504Editable, .edtSWDEditable').editable({
            source: [
                { value: '1', text: 'Yes' },
                { value: '2', text: 'No' }
            ],
            callback: function (sValue, y) {
            }
        });
        
        $("#zangleEdit, #stateEdit").editable({
            callback: function (sValue, y) {
            }
        });

        var srcSponsorTeachers = $("#jsonSponsorTeachers").val();
        $("#sponsorTeacherEdit").editable({
            source: srcSponsorTeachers,
            callback: function (sValue, y) {
            }
        });

        var srcSponsorSignatures = $("#jsonSponsorSignatures").val();
        $("#sponsorSignatureSem1Edit, #sponsorSignatureSem2Edit, #sponsorSignatureSummerEdit").editable({
            emptytext: 'Not signed',
            source: srcSponsorSignatures,
            success: function(response, newValue) {
                fpcs.studentPacket2.reloadPage();
            },
            callback: function (sValue, y) {
            }
        });

        $("#guardianSignatureSem1Edit").editable({
            emptytext: 'Not signed',
            source: srcSponsorSignatures,
            validate: function (value) {
                if (fpcs.getIsGuardian() && value == 30) {
                    if (confirm("Are you sure? You won't be able to add or remove classes after signing")) {
                    }
                    else {
                        return 'Data not save';
                    }
                }
            },
            success: function (response, newValue) {
                // if guardian and new value = Sign
                if (fpcs.getIsGuardian() && newValue == 30) {
                    $("#guardianSignatureSem1Edit").hide();
                    $("#spnGuardianSignatureSem1Edit").show();

                    // TODO: Need get value from xeditable
                    $("#spnGuardianSignatureSem1Edit").html('Signed');
                    $("#guardianSignatureSem1Edit").attr('data-signature', 'Sign');

                    fpcs.studentPacket2.checkSignedForGuardian();
                }

                fpcs.studentPacket2.reloadPage();
            }
        });

        $("#guardianSignatureSem2Edit").editable({
            emptytext: 'Not signed',
            source: srcSponsorSignatures,
            validate: function (value) {
                if (fpcs.getIsGuardian() && value == 30) {
                    if (confirm("Are you sure? You won't be able to add or remove classes after signing")) {
                    }
                    else {
                        return 'Data not save';
                    }
                }
            },
            success: function (response, newValue) {
                // if guardian and new value = Sign
                if (fpcs.getIsGuardian() && newValue == 30) {
                    $("#guardianSignatureSem2Edit").hide();
                    $("#spnGuardianSignatureSem2Edit").show();

                    // TODO: Need get value from xeditable
                    $("#spnGuardianSignatureSem2Edit").html('Signed');
                    $("#guardianSignatureSem2Edit").attr('data-signature', 'Sign');

                    fpcs.studentPacket2.checkSignedForGuardian();
                }

                fpcs.studentPacket2.reloadPage();
            }
        });
        
        $("#guardianSignatureSummerEdit").editable({
            emptytext: 'Not signed',
            source: srcSponsorSignatures,
            validate: function (value) {
                if (fpcs.getIsGuardian() && value == 30) {
                    if (confirm("Are you sure? You won't be able to add or remove classes after signing")) {
                    }
                    else {
                        return 'Data not save';
                    }
                }
            },
            success: function (response, newValue) {
                // if guardian and new value = Sign
                if (fpcs.getIsGuardian() && newValue == 30) {
                    $("#guardianSignatureSummerEdit").hide();
                    $("#spnGuardianSignatureSummerEdit").show();

                    // TODO: Need get value from xeditable
                    $("#spnGuardianSignatureSummerEdit").html('Signed');
                    $("#guardianSignatureSummerEdit").attr('data-signature', 'Sign');

                    fpcs.studentPacket2.checkSignedForGuardian();
                }
            }
        });

        var semester = $("#hdnNumberSemester").val();
        if (semester == "1") {
            $("#showSemester1").removeClass('btn-print');
            $("#showSemester1").addClass('btn-success');
            $("#showSemester2").removeClass('btn-success');
            $("#showSemester2").addClass('btn-print');
            $("#showSummer").removeClass('btn-success');
            $("#showSummer").addClass('btn-print');

            $(".table-semester1").show();
            $(".table-semester2").hide();
            $(".table-summer").hide();

            $(".create-add-course-sem1").show();
            $(".create-add-course-sem2").hide();
            $(".create-add-course-summer").hide();

            $(".signature-semester1").show();
            $(".signature-semester2").hide();
            $(".signature-summer").hide();
        }
        else if (semester == "2") {
            $("#showSummer").removeClass('btn-success');
            $("#showSummer").addClass('btn-print');
            $("#showSemester1").removeClass('btn-success');
            $("#showSemester1").addClass('btn-print');
            $("#showSemester2").removeClass('btn-print');
            $("#showSemester2").addClass('btn-success');

            $(".table-summer").hide();
            $(".table-semester1").hide();
            $(".table-semester2").show();

            $(".create-add-course-summer").hide();
            $(".create-add-course-sem1").hide();
            $(".create-add-course-sem2").show();

            $(".signature-summer").hide();
            $(".signature-semester1").hide();
            $(".signature-semester2").show();
        }
        else {
            $("#showSemester2").removeClass('btn-success');
            $("#showSemester2").addClass('btn-print');
            $("#showSemester1").removeClass('btn-success');
            $("#showSemester1").addClass('btn-print');
            $("#showSummer").removeClass('btn-print');
            $("#showSummer").addClass('btn-success');

            $(".table-semester2").hide();
            $(".table-semester1").hide();
            $(".table-summer").show();

            $(".create-add-course-sem2").hide();
            $(".create-add-course-sem1").hide();
            $(".create-add-course-summer").show();

            $(".signature-semester2").hide();
            $(".signature-semester1").hide();
            $(".signature-summer").show();
        }

        var imgComments = $(".imgComment");
        $.each(imgComments, function (index, val) {
            var title = $(val).attr('title');
            if (title == null || title == '' || title == 'Credit:') {
                $(val).hide();
            }
            else {
                $(val).show();
            }
        });

        $("#sponsorshipEdit").off('click');
        $("#sponsorshipEdit").on('click', function () {
            var studentPacketId = $("#studentPacketId").val();
            fpcs.getPartial('/GoodAndService/_PreTableGoodAndService?studentPacketId=' + studentPacketId, function (data, textStatus) {
                fpcs.showDialog("Good And Service", data, null, true);
                fpcs.goodService.initCreateGoodServiceDialog(1);
                fpcs.goodService.initDetailsGoodServiceDialog(1);

                $("#prePrintGoodOrService").off('click');
                $("#prePrintGoodOrService").on('click', function () {
                    fpcs.fpcsGoodService.initPrint3(studentPacketId);
                });

                fpcs.goodService.initDeleteGoodService(1);
            });
        });

        $(document).tooltip();
    },

    checkSignedForGuardian: function () {
        if ($("#sponsorSignatureSem1Edit").attr('data-signature') == 'Sign' &&
            $("#guardianSignatureSem1Edit").attr('data-signature') == 'Sign') {
            $(".create-add-course-sem1").remove();
            $(".table-semester1").find(".deleteStudentPacketCourse").hide();
        }

        if ($("#sponsorSignatureSem2Edit").attr('data-signature') == 'Sign' &&
            $("#guardianSignatureSem2Edit").attr('data-signature') == 'Sign') {
            $(".create-add-course-sem2").remove();
            $(".table-semester2").find(".deleteStudentPacketCourse").hide();
        }

        if ($("#sponsorSignatureSummerEdit").attr('data-signature') == 'Sign' &&
            $("#guardianSignatureSummerEdit").attr('data-signature') == 'Sign') {
            $(".create-add-course-summer").remove();
            $(".table-summer").find(".deleteStudentPacketCourse").hide();
        }
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
            fpcs.getPartial('/StudentPacket2/_SponsorTeacherEdit/' + id, function (data, textStatus) {
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

    initSponsorSignatureEdit: function () {
        $(document).off("click", "#sponsorSignatureEdit");
        $(document).on("click", "#sponsorSignatureEdit", function (e) {
            var id = $(this).attr("packetId");
            fpcs.getPartial('/StudentPacket2/_SponsorSignatureEdit/' + id, function (data, textStatus) {
                var copy = $("#sponsorSignatureWrap").html();
                $("#sponsorSignatureWrapCopy").html(copy);
                $("#sponsorSignatureWrap").html(data);
            })
        });

        $(document).off("click", "#sponsorSignatureCancel");
        $(document).on("click", "#sponsorSignatureCancel", function (e) {
            var copy = $("#sponsorSignatureWrapCopy").html();
            $("#sponsorSignatureWrap").html(copy);
            return false;
        });

        $(document).off("click", "#sponsorSignatureSend");
        $(document).on("click", "#sponsorSignatureSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("sponsorSignatureEditForm", function (data, textStatus) {
                $("#sponsorSignatureWrap").html(data);
            });
        });
    },

    initZangleEdit: function () {
        $(document).off("click", "#zangleEdit");
        $(document).on("click", "#zangleEdit", function (e) {
            var id = $(this).attr("packetId");
            fpcs.getPartial('/StudentPacket2/_ZangleEdit/' + id, function (data, textStatus) {
                var copy = $("#zangleWrap").html();
                $("#zangleWrapCopy").html(copy);
                $("#zangleWrap").html(data);
            })
        });

        $(document).off("click", "#zangleCancel");
        $(document).on("click", "#zangleCancel", function (e) {
            var copy = $("#zangleWrapCopy").html();
            $("#zangleWrap").html(copy);
            return false;
        });

        $(document).off("click", "#zangleSend");
        $(document).on("click", "#zangleSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("zangleEditForm", function (data, textStatus) {
                $("#zangleWrap").html(data);
            });
        });
    },

    initAmpElaEdit: function () {
        $(document).off("click", "#ampElaEdit");
        $(document).on("click", "#ampElaEdit", function (e) {
            var id = $(this).attr("packetId");
            fpcs.getPartial('/StudentPacket2/_AmpElaEdit/' + id, function (data, textStatus) {
                var copy = $("#ampElaWrap").html();
                $("#ampElaWrapCopy").html(copy);
                $("#ampElaWrap").html(data);
            })
        });

        $(document).off("click", "#ampElaCancel");
        $(document).on("click", "#ampElaCancel", function (e) {
            var copy = $("#ampElaWrapCopy").html();
            $("#ampElaWrap").html(copy);
            return false;
        });

        $(document).off("click", "#ampElaSend");
        $(document).on("click", "#ampElaSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("ampElaEditForm", function (data, textStatus) {
                $("#ampElaWrap").html(data);
                $("#refreshPlanCourseDialog").trigger('click');
            });
        });
    },

    initAmpMathEdit: function () {
        $(document).off("click", "#ampMathEdit");
        $(document).on("click", "#ampMathEdit", function (e) {
            var id = $(this).attr("packetId");
            fpcs.getPartial('/StudentPacket2/_AmpMathEdit/' + id, function (data, textStatus) {
                var copy = $("#ampMathWrap").html();
                $("#ampMathWrapCopy").html(copy);
                $("#ampMathWrap").html(data);
            })
        });

        $(document).off("click", "#ampMathCancel");
        $(document).on("click", "#ampMathCancel", function (e) {
            var copy = $("#ampMathWrapCopy").html();
            $("#ampMathWrap").html(copy);
            return false;
        });

        $(document).off("click", "#ampMathSend");
        $(document).on("click", "#ampMathSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("ampMathEditForm", function (data, textStatus) {
                $("#ampMathWrap").html(data);
                $("#refreshPlanCourseDialog").trigger('click');
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

        $(document).off("click", ".showPlanCourseDialogUp, .showPlanCourseDialogDown, .showPlanCourseDialogMiddle");
        $(document).on("click", ".showPlanCourseDialogUp, .showPlanCourseDialogDown, .showPlanCourseDialogMiddle", function (e) {
            $("#planCourseDialog").html('<div class="row-fluid form-horizontal">' +
                            '<div class="span12 planCourseGridWrapper">' +
                                '<table id="planCourseGridTable"></table>' +
                                '<div id="planCourseGridPager"></div>' +
                            '</div>' +
                        '</div>');
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
            var sponsorId = $("#sponsorTeacherId").val();
            var semester = $("#hdnNumberSemester").val();
            fpcs.studentPacket2.initPlanCourseGrig(studentId, studentPacketId, sponsorId, semester);
        });
        
        $(document).off("click", ".showAddCourseDialogUp, .showAddCourseDialogDown, .showAddCourseDialogMiddle");
        $(document).on("click", ".showAddCourseDialogUp, .showAddCourseDialogDown, .showAddCourseDialogMiddle", function (e) {
            var studentPacketId = $("#StudentPacketId").val();
            var sponsorSignature = $("#sponsorSignature").val();
            var guardianSignature = $("#guardianSignature").val();

            var semester = $("#hdnNumberSemester").val();
            fpcs.getPartial('/FPCSCourse/_MegaCreate?studentPacketId=' + studentPacketId + "&semester=" + semester, function (data, textStatus) {
                fpcs.showDialog("Create FPCS Course", data);
                fpcs.fpcsCourse.initMegaCreateFPCSCourseSend();
                if (sponsorSignature == "Sign" && guardianSignature == "Sign") {
                    $("#goodAndServiceTabId").show();
                }
                else {
                    $("#goodAndServiceTabId").hide();
                }
                fpcs.fpcsCourse.initTeacherGuardianOpen();
            });
        });

        $(document).off("click", "#printStudentPacket");
        $(document).on("click", "#printStudentPacket", function (e) {
            var studentId = $("#StudentId").val();
            fpcs.getPartial('/StudentPacket2/_Print/' + studentId, function (data, textStatus) {
                fpcs.showDialog("Print form", data);
                fpcs.studentPacket2.hideActualSpendingColumn();
            });
        });

        $(document).off("click", "#printReimbursement");
        $(document).on("click", "#printReimbursement", function (e) {
            var studentId = $("#StudentId").val();
            fpcs.getPartial('/StudentPacket2/_PrintReimbursement/' + studentId, function (data, textStatus) {
                fpcs.showDialog("Print form", data);
            });
        });

        $(document).off("click", "#showASDTestingAgreementDialog");
        $(document).on("click", "#showASDTestingAgreementDialog", function (e) {
            var studentPacketId = $("#StudentPacketId").val();
            fpcs.getPartial('/StudentPacket2/_ASDTestingAgreement/' + studentPacketId, function (data, textStatus) {
                fpcs.showDialog("ASD Testing Agreement", data);
            });
        });

        $(document).off("click", "#showProgressReportAgreementDialog");
        $(document).on("click", "#showProgressReportAgreementDialog", function (e) {
            var studentPacketId = $("#StudentPacketId").val();
            fpcs.getPartial('/StudentPacket2/_ProgressReportAgreement/' + studentPacketId, function (data, textStatus) {
                fpcs.showDialog("Progress Report Agreement", data);
            });
        });

        $(document).off("click", "#refreshPlanCourseDialog");
        $(document).on("click", "#refreshPlanCourseDialog", function (e) {
            fpcs.studentPacket2.reloadPage();
        });

        $(document).off("click", "#lockedPlanCourseDialog");
        $(document).on("click", "#lockedPlanCourseDialog", function (e) {
            location.href = "/StudentPacket2/Locked/" + $("#StudentId").val();
        });

        $(document).off("click", "#unlockedPlanCourseDialog");
        $(document).on("click", "#unlockedPlanCourseDialog", function (e) {
            location.href = "/StudentPacket2/Unlocked/" + $("#StudentId").val();
        });
    },

    initShowDetailsFPCSStudentPacketCourse: function () {
        $(document).off("click", ".detailsFPCSStudentPacketCourse");
        $(document).on("click", ".detailsFPCSStudentPacketCourse", function (e) {
            e.preventDefault();
            var fpcsCourseId = $(this).attr("data-FPCSCourseId");
            fpcs.fpcsCourse.showDetailsDialog(fpcsCourseId);
        });
    },

    initShowFPCSCourseInfo: function () {
        $(document).off("click", ".infoFPCSCourse");
        $(document).on("click", ".infoFPCSCourse", function (e) {
            e.preventDefault();
            var fpcsCourseId = $(this).attr("data-fpcscourseid");
            fpcs.studentPacket2.isCanEditFpcsCourse(this, fpcsCourseId);
        });
    },

    initShowDataFPCSStudentPacketCourse: function () {
        $(document).off("click", ".dataFPCSStudentPacketCourse");
        $(document).on("click", ".dataFPCSStudentPacketCourse", function (e) {
            e.preventDefault();
            var studentPacketCourseId = $(this).attr("data-StudentPacketCourseId");
            fpcs.studentPacket2.isCanEditStudentPacketCourse(this, studentPacketCourseId);
        });
    },

    initDeleteStudentPacketCourse: function () {
        var btnDeletes = $(".deleteStudentPacketCourse");
        $.each(btnDeletes, function (index, val) {
            fpcs.studentPacket2.isCanDeleteStudentPacketCourse(val);
        });

        $(document).off("click", ".deleteStudentPacketCourse");
        $(document).on("click", ".deleteStudentPacketCourse", function (e) {
            e.preventDefault();
            var studentPacketCourseId = $(this).attr("data-StudentPacketCourseId");
            var url = "/StudentPacket2/DeleteStudentPacketCourse";
            fpcs.executeServiceWithConfirm(url, { studentPacketCourseId: studentPacketCourseId }, function (data) {
                if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 200) {
                    fpcs.studentPacket2.reloadPage();
                }
                else if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 500) {
                    fpcs.showErrorMessage(data.Message);
                }
            });
        });
    },

    initPlanCourseGrig: function (studentId, studentPacketId, sponsorId, semester) {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".planCourseGridWrapper",
            gridSelector: "#planCourseGridTable",
            pagerSelector: "#planCourseGridPager",
            multiselect: false,
            showEditButton: false,
            showDeleteButton: false,
            url: "/StudentPacket2/_FPCSCourses?studentId=" + studentId + "&sponsorId=" + sponsorId + "&studentPacketId=" + studentPacketId + "&semester=" + semester,
            sortname: 'Name',
            jsonReader: {
                repeatitems: false,
                id: "FPCSCourseId"
            },
            colNames: ['ID', 'Name', 'Teacher', 'Guardian', 'Vendor', 'Cost', 'Subject', 'Semester', 'Actions'],
            colModel: [
				{ name: 'FPCSCourseId', index: 'FPCSCourseId', key: true, hidden: true, width: 60 },
				{ name: 'Name', index: 'Name', width: 120 },
                { name: 'Teacher', index: 'Teacher', width: 100 },
                { name: 'Guardian', index: 'Guardian', width: 100 },
                { name: 'Vendor', index: 'Vendor', width: 100 },
                { name: 'Cost', index: 'Cost', width: 100, sortable: false, resize: false, search: false },
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
        fpcs.studentPacket2.initAddFPCSStudentPacketCourse();
    },

    initAddFPCSStudentPacketCourse: function () {
        $(document).off("click", ".gridRowAddFPCSCourse");
        $(document).on("click", ".gridRowAddFPCSCourse", function (e) {
            var fpcsCourseId = $(this).attr("rowid");
            var studentPacketId = $("#StudentPacketId").val();
            var url = "/StudentPacket2/AddFPCSStudentPacketCourse";
            fpcs.executeService(url, { fpcsCourseId: fpcsCourseId, studentPacketId: studentPacketId }, function (data) {
                if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 200) {
                    fpcs.studentPacket2.reloadPage();
                }
                else if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 800) {
                    jAlert(data.Message, "Information");
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
            if (!fpcs.getIsGuardian() || fpcs.studentPacket2.getIsLocked()) {
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
            if (!fpcs.getIsGuardian() || fpcs.studentPacket2.getIsLocked()) {
                $(item).hide();
            }
            else {
                $(item).show();
            }
        });
    },

    clickASDTAAgreement: function (studentId) {
        fpcs.executeService(
            '/StudentPacket2/SignASDTestingAgreement',
            {
                studentId: studentId
            },
            function () {
                fpcs.studentPacket2.reloadPage();
            }
        );
    },

    clickPRAAgreement: function (studentId) {
        fpcs.executeService(
            '/StudentPacket2/SignProgressReportAgreement',
            {
                studentId: studentId
            },
            function () {
                fpcs.studentPacket2.reloadPage();
            }
        );
    },

    isCanEditFpcsCourse: function (btn, fpcsCourseId) {
        var signatureSponsor = $("#sponsorSignatureSem1Edit").text().trim();
        var guardianSponsor = $("#guardianSignatureSem1Edit").text().trim();
        var zangle = $(btn).closest("tr").find(".xsysval").text().trim();
        var isExistZangle = zangle != "" && zangle != "Empty" && zangle != "No";

        if (isExistZangle == true && fpcs.getIsAdmin()) {
            fpcs.fpcsCourse.showEditOnlyInfoDialog(fpcsCourseId);
        }
        else if (isExistZangle == false && (signatureSponsor != 'Signed' || guardianSponsor != 'Signed')) {
            fpcs.fpcsCourse.showEditOnlyInfoDialog(fpcsCourseId);
        }
        else if (isExistZangle == false && signatureSponsor == 'Signed' && guardianSponsor == 'Signed' && (fpcs.getIsTeacher() || fpcs.getIsAdmin())) {
            fpcs.fpcsCourse.showEditOnlyInfoDialog(fpcsCourseId);
        }
        else if (isExistZangle == true) {
            fpcs.showMessage("Course information has been entered in Zangle. Editing can only be done by Admin.");
        }
        else {
            fpcs.showMessage("Not enough rights");
        }
    },

    isCanEditStudentPacketCourse: function (btn, studentPacketCourseId) {
        var adminSignatureInt = $(btn).closest("tr").find("#AdminSignatureInt").val() * 1;
        var instructorId = $(btn).attr('data-instructor');
        var sponsorId = $("#sponsorTeacherId").val();
        var currentUserId = $("#currentUserId").val();

        // If admin signature equal Sign and role current user isn't Admin
        // OR
        // If user is teacher and isn't sposnsor packet course and isn't instructor course
        if (((adminSignatureInt == 30 && !fpcs.getIsAdmin()) || fpcs.studentPacket2.getIsLocked()) ||
            (fpcs.getIsTeacher() &&
             currentUserId != sponsorId &&
             currentUserId != instructorId)) {
            fpcs.dataStudentPacket.showReviewDialog(studentPacketCourseId);
        }
        else {
            fpcs.dataStudentPacket.showDetailDialog(studentPacketCourseId);
        }
    },

    isCanDeleteStudentPacketCourse: function (btn) {
        var adminSignatureInt = $(btn).closest("tr").find("#AdminSignatureInt").val() * 1;
        var instructorId = $(btn).attr('data-instructor');
        var sponsorId = $("#sponsorTeacherId").val();
        var currentUserId = $("#currentUserId").val();

        // If admin signature equal Sign and role current user isn't Admin
        // OR
        // If user is teacher and isn't sposnsor packet course and isn't instructor course
        if (((adminSignatureInt == 30 && !fpcs.getIsAdmin()) || fpcs.studentPacket2.getIsLocked()) ||
            (fpcs.getIsTeacher() &&
             currentUserId != sponsorId &&
             currentUserId != instructorId)) {
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

    reloadPage: function (semester) {
        fpcs.showLoader();
        var studentId = $("#StudentId").val();
        if (studentId != null && studentId != undefined) {
            if (semester == null || semester == undefined) {
                semester = $("#hdnNumberSemester").val();
            }

            location.href = "/StudentPacket2/Index/" + $("#StudentId").val() + "?semester=" + semester;
        } else {
            fpcs.hideLoader();
        }
    },

    printReimbursement: function () {
        var sheets = $(".sheetPrint");
        $.each(sheets, function (indexSheet, elemSheet) {
            var total = $(elemSheet).find(".hidTotalReimbursement").val();

            var items = $(elemSheet).find(".cbSelectedReimbursement:not(:checked)");
            $.each(items, function (index, item) {
                $(item).parent().parent().hide();
                total -= $(item).siblings('input[type=hidden]').val();
            });

            $(elemSheet).find(".totalReimbursement").html("$" + total + "&nbsp;");
            $(elemSheet).find(".instruction").hide();
            $(elemSheet).find(".infoProcedures").hide();
            $(elemSheet).find(".infoCheckPayable").show();

            var itemsCbColumn = $(elemSheet).find(".cbColumn");
            $.each(itemsCbColumn, function (index, item) {
                $(item).hide();
            });
        });

        fpcs.print('print');

        $.each(sheets, function (indexSheet, elemSheet) {
            var total = $(elemSheet).find(".hidTotalReimbursement").val();

            var items = $(elemSheet).find(".cbSelectedReimbursement:not(:checked)");
            $.each(items, function (index, item) {
                $(item).parent().parent().show();
            });

            $(elemSheet).find(".totalReimbursement").html("$" + $(elemSheet).find(".hidTotalReimbursement").val() + "&nbsp;");
            $(elemSheet).find(".instruction").show();
            $(elemSheet).find(".infoCheckPayable").hide();
            $(elemSheet).find(".infoProcedures").hide();

            var itemsCbColumn = $(elemSheet).find(".cbColumn");
            $.each(itemsCbColumn, function (index, item) {
                $(item).show();
            });
        });
    }
}