fpcs.fpcsCourse = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "FPCSCourse",
            url: "/FPCSCourse/_Index",
            sortname: 'Name',
            jsonReader: {
                repeatitems: false,
                id: "FPCSCourseId"
            },
            colNames: ['ID', 'Name', 'Class Type', 'Subject', 'Available Spots', 'Unit', 'Is Activated', 'Actions'],
            colModel: [
				{ name: 'FPCSCourseId', index: 'FPCSCourseId', key: true, hidden: true },
				{ name: 'Name', index: 'Name', width: 100 },
                { name: 'ClassType', index: 'ClassType', width: 70, sortable: false, search: false },
				{ name: 'Subject', index: 'Subject', width: 150, stype: "select", searchoptions: { value: $("#subjectSearchOptions").val() }, sortable: false },
                { name: 'AvailableSpots', index: 'AvailableSpots', width: 70, sortable: false, search: false },
                { name: 'GradCredit', index: 'GradCredit', width: 40, sortable: true, search: false },
                { name: 'IsActivated', index: 'IsActivated', width: 50, search: false },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false },
            ],
            gridComplete: function () {
                var ids = grid.jqGrid('getDataIDs');
                for (var i = 0; i < ids.length; i++) {
                    var cl = ids[i];

                    var row = grid.getRowData(cl);

                    var showEditButton = fpcs.getIsAdmin() ||
                                         fpcs.getIsTeacher() ||
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
            }
        });
        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("FPCSCourse");

        fpcs.jqGrid.initNavButtons(null, fpcs.fpcsCourse.showCreateFPCSCourseDialog, "Add new course");

        $(".page-header").find('h1').append("<button id='addFPCSCourseDialog' class='btn btn-success btn-small'>Add new course</button>");
        $(document).off("click", "#addFPCSCourseDialog");
        $(document).on("click", "#addFPCSCourseDialog", function (e) {
            fpcs.fpcsCourse.showCreateFPCSCourseDialog();
        });

        fpcs.fpcsCourse.initDetailsDialog();
        //fpcs.fpcsCourse.initCreateFPCSCourseSend();
        fpcs.fpcsCourse.initMegaCreateFPCSCourseSend();
        fpcs.fpcsCourse.initEditDialog();
        fpcs.fpcsCourse.initDeleteFPCSCourse();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("FPCSCourse");
        });
    },

    showDetailsDialog: function (id) {
        fpcs.getPartial('/FPCSCourse/_PreDetails/' + id, function (data, textStatus) {
            fpcs.showDialog("FPCS Course details", data);
            fpcs.fpcsCourse.updateClassCosts();
            var val = $("#ScheduleRepetition").val();
            if (val == "Daily" || val == "Monday-Friday") {
                $(".dayCheckboxDiv").first().css("visibility", "hidden");
                $(".otherDays").hide();
            }
        });
    },

    initDetailsDialog: function () {
        $(document).off("click", ".gridRowDetails");
        $(document).on("click", ".gridRowDetails", function (e) {
            var id = $(this).attr("rowid");
            fpcs.fpcsCourse.showDetailsDialog(id);
        });
    },

    reloadCourses: function (isNewCourse, isChangeName) {
        var gradeLevel = $("#GradeLevel option:selected").val();
        var courseSubjectId = $("#CourseSubjectId option:selected").val();

        var subjectsData = [];
        var data = [];

        if ((gradeLevel == 0 || gradeLevel == "" || gradeLevel == null) &&
            (courseSubjectId == 0 || courseSubjectId == "" || courseSubjectId == null)) {
            data = $("#ASDCourseId3").find("option");
        }
        else if ((gradeLevel == 0 || gradeLevel == "" || gradeLevel == null) &&
                (courseSubjectId != 0 && courseSubjectId != "" && courseSubjectId != null)) {
            data = $("#ASDCourseId3").find("option[data-subject-id='" + courseSubjectId + "']");
        }
        else if ((gradeLevel != 0 && gradeLevel != "" && gradeLevel != null) &&
            (courseSubjectId == 0 || courseSubjectId == "" || courseSubjectId == null)) {

            var optionsData = $("#Subjects2 option");
            $.each(optionsData, function(index, value) {
                var item = $(value).attr("data-count");
                if (item.indexOf("TG" + gradeLevel) != -1) {
                    subjectsData.push($(value).val());
                }
            });

            data = $("#ASDCourseId3").find("option[data-type-class='" + gradeLevel + "']");
        }
        else {
            var optionsData = $("#Subjects2 option");
            $.each(optionsData, function (index, value) {
                var item = $(value).attr("data-count");
                if (item.indexOf("TG" + gradeLevel) != -1) {
                    subjectsData.push($(value).val());
                }
            });

            if (subjectsData.indexOf(courseSubjectId) != -1) {
                data = $("#ASDCourseId3").find("option[data-type-class='" + gradeLevel + "'][data-subject-id='" + courseSubjectId + "']");
            } else {
                data = $("#ASDCourseId3").find("option[data-type-class='" + gradeLevel + "']");
            }
        }

        if (gradeLevel != 0 && gradeLevel != "" && gradeLevel != null) {
            var html_value_subjects = '';
            $.each(subjectsData, function(index, item) {
                html_value_subjects += $("#Subjects2 option[value='" + item + "']").prop('outerHTML');
            });

            $("#CourseSubjectId").empty();
            $("#CourseSubjectId").append("<option value='0'></option>");
            $("#CourseSubjectId").append(html_value_subjects);
        } else {
            var html_value_subjects = $("#Subjects2").html();
            $("#CourseSubjectId").empty();
            $("#CourseSubjectId").append("<option value='0'></option>");
            $("#CourseSubjectId").append(html_value_subjects);
        }

        if (courseSubjectId != 0 && courseSubjectId != "" && courseSubjectId != null) {
            $("#CourseSubjectId").val(courseSubjectId);
        }

        var html_value = '';
        $.each(data, function (index, item) {
            html_value += $(item).prop('outerHTML');
        });

        var asdCourseId = 0;
        if (!isNewCourse) {
            asdCourseId = $("#ASDCourseId").val();
        }

        $("#ASDCourseId").empty();
        $("#ASDCourseId").append(html_value);
        if (!isNewCourse)
            $("#ASDCourseId").val(asdCourseId);
        $('#ASDCourseId').trigger("chosen:updated");

        if (isChangeName)
            fpcs.fpcsCourse.initChangeASDCourseMethod($("#ASDCourseId").val());
    },

    initCreateEditDialogs: function () {
        fpcs.initDatePicker();
        fpcs.initTimePicker(".bootstrap-timepicker input");
        $(".chosen-select").chosen();
        fpcs.fpcsCourse.initUpdateSchedule();
        fpcs.fpcsCourse.initUpdateClassCosts();
        fpcs.fpcsCourse.initChangeTeacher();
        fpcs.fpcsCourse.initChangeGuardian();
        fpcs.fpcsCourse.initChangeVendor();
        fpcs.fpcsCourse.initChangeASDCourse();
        fpcs.fpcsCourse.initChangeAdditionalSubject();

        var isNewCourse = $("#FPCSCourseId").val() * 1 == 0;
        fpcs.fpcsCourse.reloadCourses(isNewCourse, false);

        $("#GradeLevel").change(function () {
            fpcs.fpcsCourse.reloadCourses(false, true);
        });

        $("#CourseSubjectId").change(function () {
            fpcs.fpcsCourse.reloadCourses(false, true);
        });

        if ($("#TeacherId").val() != null &&
            $("#TeacherId").val() != undefined &&
            $("#TeacherId").val() != '') {
            $("#classCosts").show();
            $("#registrationDeadlineDiv").show();
            $("#minMaxStudentsGradesDiv").show();
            $("#scheduleRepetitionDiv").show();
        }

        if ($("#GuardianId").val() != null &&
            $("#GuardianId").val() != undefined &&
            $("#GuardianId").val() != '') {
            $("#classCosts").hide();
            $("#registrationDeadlineDiv").hide();
            $("#minMaxStudentsGradesDiv").hide();
            $("#scheduleRepetitionDiv").hide();
        }

        if ($("#VendorId").val() != null &&
            $("#VendorId").val() != undefined &&
            $("#VendorId").val() != '') {
            $("#classCosts").hide();
            $("#registrationDeadlineDiv").hide();
            $("#minMaxStudentsGradesDiv").hide();
            $("#scheduleRepetitionDiv").hide();
        }

        fpcs.fpcsCourse.initVisibleArea();
    },

    initVisibleArea: function () {
        if (fpcs.getIsGuardian()) {
            $("#registrationDeadlineDiv").hide();
            $("#minMaxStudentsGradesDiv").hide();
            $("#courseForFamiliesHrDiv").hide();
            $("#courseForFamiliesDiv").hide();
        }
    },

    showCreateFPCSCourseDialog: function () {
        fpcs.getPartial('/FPCSCourse/_MegaCreate/', function (data, textStatus) {
            fpcs.showDialog("Create FPCS Course", data);
            fpcs.fpcsCourse.initTeacherGuardianOpen();
        });
    },

    initTeacherGuardianOpen: function () {
        //$("#teacherDialog").dialog({
        //    resizable: false,
        //    draggable: false,
        //    modal: true,
        //    autoOpen: false,
        //    title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>Create and add new teacher</h4></div>",
        //    title_html: true,
        //    width: "80%",
        //    position: ['top', 0]
        //});

        //$("#guardianDialog").dialog({
        //    resizable: false,
        //    draggable: false,
        //    modal: true,
        //    autoOpen: false,
        //    title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>Create and add new guardian</h4></div>",
        //    title_html: true,
        //    width: "80%",
        //    position: ['top', 0]
        //});

        //$("#vendorDialog").dialog({
        //    resizable: false,
        //    draggable: false,
        //    modal: true,
        //    autoOpen: false,
        //    title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>Create and add new vendor</h4></div>",
        //    title_html: true,
        //    width: "80%",
        //    position: ['top', 0]
        //});

        //$(document).off("click", ".createTeacherOpen");
        //$(document).on("click", ".createTeacherOpen", function (e) {
        //    e.preventDefault();
        //    fpcs.getPartial('/Teacher/Create/', function (data, textStatus) {
        //        $("#teacherDialog").dialog("open");
        //        $("#teacherContent").html(data);
        //        fpcs.fpcsCourse.initTeacherContent();
        //    });
        //});

        //$(document).off("click", ".createGuardianOpen");
        //$(document).on("click", ".createGuardianOpen", function (e) {
        //    e.preventDefault();
        //    fpcs.getPartial('/Guardian/_Create/', function (data, textStatus) {
        //        $("#guardianDialog").dialog("open");
        //        $("#guardianContent").html(data);
        //        fpcs.fpcsCourse.initGuardianContent();
        //    });
        //});

        //$(document).off("click", ".createVendorOpen");
        //$(document).on("click", ".createVendorOpen", function (e) {
        //    e.preventDefault();
        //    fpcs.getPartial('/Vendor/Create/', function (data, textStatus) {
        //        $("#vendorDialog").dialog("open");
        //        $("#vendorContent").html(data);
        //        fpcs.fpcsCourse.initVendorContent();
        //        fpcs.initDatePicker();
        //    });
        //});
    },

    initTeacherContent: function () {
        fpcs.initDatePicker();

        $(document).off("click", ".createTeacherSend");
        $(document).on("click", ".createTeacherSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createTeacherForm", function (data, textStatus) {
               if (typeof data == "object" && data.ErrorCode == 200) {
                   var obj = JSON.parse(data.Obj);
                   $('#TeacherId').append('<option value="' + obj.id + '">' + obj.text + '</option>');
                   $('#TeacherId').val(obj.id);
                   $('#TeacherId').trigger('chosen:updated');
                   $("#teacherDialog").dialog("close");
               }
               else {
                   $("#teacherContent").html(data);
                   fpcs.fpcsCourse.initTeacherContent();
               }
            });
        });

        $(document).off("click", ".cancelTeacherSend");
        $(document).on("click", ".cancelTeacherSend", function (e) {
            e.preventDefault();
            $("#teacherDialog").dialog("close");
        });
    },

    initGuardianContent: function () {
        fpcs.initDatePicker();

        $(document).off("click", ".createGuardianSend");
        $(document).on("click", ".createGuardianSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createGuardianForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    var obj = JSON.parse(data.Obj);
                    $('#GuardianId').append('<option value="' + obj.id + '">' + obj.text + '</option>');
                    $('#GuardianId').val(obj.id);
                    $('#GuardianId').trigger('chosen:updated');
                    $("#guardianDialog").dialog("close");
                }
                else {
                    $("#guardianContent").html(data);
                    fpcs.fpcsCourse.initGuardianContent();
                }
            });
        });

        $(document).off("click", ".cancelGuardianSend");
        $(document).on("click", ".cancelGuardianSend", function (e) {
            e.preventDefault();
            $("#guardianDialog").dialog("close");
        });
    },

    initVendorContent: function () {
        fpcs.initDatePicker();

        $(document).off("click", ".vendorSend");
        $(document).on("click", ".vendorSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createVendorForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    var obj = JSON.parse(data.Obj);
                    $('#VendorId').append('<option value="' + obj.id + '">' + obj.text + '</option>');
                    $('#VendorId').val(obj.id);
                    $('#VendorId').trigger('chosen:updated');
                    $("#vendorDialog").dialog("close");
                }
                else {
                    $("#vendorContent").html(data);
                    fpcs.fpcsCourse.initVendorContent();
                }
            });
        });

        $(document).off("click", ".cancelSend");
        $(document).on("click", ".cancelSend", function (e) {
            e.preventDefault();
            $("#vendorDialog").dialog("close");
        });
    },

    initMegaCreateFPCSCourseSend: function () {
        $(document).off("click", ".megaCreateFPCSCourseSend");
        $(document).on("click", ".megaCreateFPCSCourseSend", function (e) {
            e.preventDefault();

            var that = this;
            $(that).attr("disabled", true);
            fpcs.sendForm("megaCreateFPCSCourseForm", function (data, textStatus) {
                $(that).attr("disabled", false);
                if (typeof data == "object" && data.ErrorCode == 200) {
                    var objData = JSON.parse(data.Obj);

                    fpcs.fpcsCourse.reloadGrid();
                    fpcs.closeDialog();

                    var studentPacketId = $("#studentPacketId").val();
                    if (studentPacketId != undefined) {
                        location.reload();
                    }

                    $("#hdnNumberSemester").val(objData.Semester);
                }
                else if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 800) {
                    jAlert(data.Message, "Information");
                }
                else {
                    fpcs.showDialog("Create FPCS Course", data);
                }
            });
        });
    },

    initCreateFPCSCourseSend: function () {
        $(document).off("click", ".createFPCSCourseSend");
        $(document).on("click", ".createFPCSCourseSend", function (e) {
            e.preventDefault();

            var that = this;
            $(that).attr("disabled", true);
            fpcs.sendForm("createFPCSCourseForm", function (data, textStatus) {
                $(that).attr("disabled", false);
                if (typeof data == "object" && data.ErrorCode == 200) {
                    var objData = JSON.parse(data.Obj);

                    fpcs.fpcsCourse.reloadGrid();
                    fpcs.closeDialog();
                    
                    $("#hdnNumberSemester").val(objData.Semester);

                    var id = objData.FPCSCourseId;
                    fpcs.getPartial('/FPCSCourse/_PreEdit/' + id, function (data, textStatus) {
                        fpcs.showDialog("Edit FPCS Course", data);
                        fpcs.fpcsCourse.initTeacherGuardianOpen();
                    });

                    //$("#refreshPlanCourseDialog").trigger('click');
                }
                else if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 800) {
                    jAlert(data.Message, "Information");
                }
                else {
                    fpcs.showDialog("Create FPCS Course", data);
                }
            });
        });
    },

    showDetailsOnlyInfoDialog: function (id) {
        fpcs.getPartial('/FPCSCourse/_PreDetails/' + id, function (data, textStatus) {
            fpcs.showDialog("FPCS Course details", data);
            fpcs.fpcsCourse.updateClassCosts();
            var val = $("#ScheduleRepetition").val();
            if (val == "Daily" || val == "Monday-Friday") {
                $(".dayCheckboxDiv").first().css("visibility", "hidden");
                $(".otherDays").hide();
            }

            $('a.ilp').parent().hide();
            $('a.goodAndService').parent().hide();
        });
    },

    showEditOnlyInfoDialog: function (id) {
        fpcs.getPartial('/FPCSCourse/_PreEdit/' + id, function (data, textStatus) {
            fpcs.showDialog("Edit FPCS Course", data);
            fpcs.fpcsCourse.initTeacherGuardianOpen();

            $('a.ilp').parent().hide();
            $('a.goodAndService').parent().hide();
        });

        $(document).off("click", ".editFPCSCourseSend");
        $(document).on("click", ".editFPCSCourseSend", function (e) {
            e.preventDefault();

            var that = this;
            $(that).attr("disabled", true);
            fpcs.sendForm("editFPCSCourseForm", function (data, textStatus) {
                $(that).attr("disabled", false);
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.fpcsCourse.reloadGrid();
                    fpcs.closeDialog();

                    var studentPacketId = $("#studentPacketId").val();
                    if (studentPacketId != undefined) {
                        location.reload();
                    }
                }
                else {
                    fpcs.showDialog("Edit FPCS Course", data);
                }
            });
        });
    },

    initEditDialog: function () {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/FPCSCourse/_PreEdit/' + id, function (data, textStatus) {
                fpcs.showDialog("Edit FPCS Course", data);
                fpcs.fpcsCourse.initTeacherGuardianOpen();
            });
        });

        $(document).off("click", ".editFPCSCourseSend");
        $(document).on("click", ".editFPCSCourseSend", function (e) {
            e.preventDefault();

            var that = this;
            $(that).attr("disabled", true);
            fpcs.sendForm("editFPCSCourseForm", function (data, textStatus) {
                $(that).attr("disabled", false);
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.fpcsCourse.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit FPCS Course", data);
                }
            });
        });
    },

    initPrintDetailsDialog: function () {
        $(document).off("click", ".printFPCSCourse");
        $(document).on("click", ".printFPCSCourse", function (e) {
            var id = $("#FPCSCourseId").val();
            fpcs.getPartial('/FPCSCourse/_Print/' + id, function (data, textStatus) {
                fpcs.showDialog("Print Form", data);
                fpcs.fpcsCourse.updateClassCostsPrint();
                var val = $("#ScheduleRepetition").val();
                if (val == "Daily" || val == "Monday-Friday") {
                    var divCBs = $(".dayCheckboxDiv");
                    $.each(divCBs, function (index, item) {
                        $(item).hide();
                    });

                    var trs = $(".otherDays");
                    $.each(trs, function (index, item) {
                        $(item).hide();
                    });
                }
            });
        });
    },

    initDeleteFPCSCourse: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/FPCSCourse/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fpcs.fpcsCourse.reloadGrid();
            });
        });
    },

    initUpdateSchedule: function () {
        $(document).off("change", "#ScheduleRepetition");
        $(document).on("change", "#ScheduleRepetition", function (e) {
            var value = $(this).val();
            if (value == "Daily" || value == "MonFri") {
                $(".dayCheckboxDiv input").first().prop("checked", true);
                $(".dayCheckboxDiv").first().css("visibility", "hidden");
                $(".dayDiv").first().find("input:not(:checkbox)").removeAttr("disabled readonly");
                $(".otherDays .dayCheckboxDiv input").prop("checked", false);
                $(".otherDays .dayDiv").find("input:not(:checkbox)").attr("disabled", "true").attr("readonly", "true");
                $(".otherDays").hide();
            }
            else {
                $(".dayCheckboxDiv").first().css("visibility", "visible");
                $(".otherDays").show();
            }
        });
        $("#ScheduleRepetition").trigger("change");
        $(document).off("change", ".dayCheckboxDiv input");
        $(document).on("change", ".dayCheckboxDiv input", function (e) {
            if ($(this).is(":checked")) {
                $(this).closest(".dayDiv").find("input:not(:checkbox)").removeAttr("disabled readonly");
            } else {
                $(this).closest(".dayDiv").find("input:not(:checkbox)").attr("disabled", "true").attr("readonly", "true");
            }
        });
    },

    initUpdateClassCosts: function () {
        $(document).off("change", "#MinStudentsCount,#MaxStudentsCount,#HoursWithAllStudents,#HoursTeacherPlanning");
        $(document).on("change", "#MinStudentsCount,#MaxStudentsCount,#HoursWithAllStudents,#HoursTeacherPlanning", function (e) {
            fpcs.fpcsCourse.updateClassCosts();
        });
        $("#HoursWithAllStudents").trigger("change");
    },

    updateClassCosts: function () {
        var minStudentsCount = parseInt($("#MinStudentsCount").val());
        var maxStudentsCount = parseInt($("#MaxStudentsCount").val());
        var hoursWithAllStudents = parseFloat($("#HoursWithAllStudents").val());
        var hoursTeacherPlanning = parseFloat($("#HoursTeacherPlanning").val());

        if ($("#TeachersHourlyRateStr").val() != undefined) {
            var teachersHourlyRate = parseFloat($("#TeachersHourlyRateStr").val().replace("$", ""));
        }

        if (isNaN(teachersHourlyRate)) teachersHourlyRate = 0;

        if ($("#totalMiscellaneousCosts").val() != undefined) {
            var totalMiscellaneousCosts = parseFloat($("#totalMiscellaneousCosts").val().replace("$", ""));
        }

        var totalTeacherHours = hoursWithAllStudents + hoursTeacherPlanning;
        var minHoursPerStudent = maxStudentsCount == 0 ? totalTeacherHours : fpcs.fpcsCourse.round(totalTeacherHours / maxStudentsCount, 4);
        var maxHoursPerStudent = minStudentsCount == 0 ? totalTeacherHours : fpcs.fpcsCourse.round(totalTeacherHours / minStudentsCount, 4);
        var minTotalTeacherCost = fpcs.fpcsCourse.round(minHoursPerStudent * teachersHourlyRate);
        var maxTotalTeacherCost = fpcs.fpcsCourse.round(maxHoursPerStudent * teachersHourlyRate);
        var totalCourseCost = fpcs.fpcsCourse.round(totalTeacherHours * teachersHourlyRate);
        var minTotalDeduction = fpcs.fpcsCourse.round(minTotalTeacherCost + totalMiscellaneousCosts);
        var maxTotalDeduction = fpcs.fpcsCourse.round(maxTotalTeacherCost + totalMiscellaneousCosts);

        $("#totalTeacherHours").val(totalTeacherHours);
        $("#minHoursPerStudent").val(minHoursPerStudent);
        $("#maxHoursPerStudent").val(maxHoursPerStudent);
        $("#minTotalTeacherCost").val("$" + minTotalTeacherCost);
        $("#maxTotalTeacherCost").val("$" + maxTotalTeacherCost);
        $("#totalCourseCost").val("$" + totalCourseCost);
        $("#minTotalDeduction").val("$" + minTotalDeduction);
        $("#maxTotalDeduction").val("$" + maxTotalDeduction);
        
        var enrolledCount = parseInt($("#EnrolledCount").val());
        if (!isNaN(enrolledCount)) {
            var hoursChargedPerStudent = enrolledCount == 0 ? totalTeacherHours : fpcs.fpcsCourse.round(totalTeacherHours / enrolledCount, 4);
            var teacherCostPerStudent = fpcs.fpcsCourse.round(hoursChargedPerStudent * teachersHourlyRate);
            
            $("#hoursChargedPerStudent").val(hoursChargedPerStudent);
            $("#teacherCostPerStudent").val("$" + teacherCostPerStudent);
        }
    },

    updateClassCostsPrint: function () {
        var minStudentsCount = parseInt($("#MinStudentsCount").val());
        var maxStudentsCount = parseInt($("#MaxStudentsCount").val());
        var hoursWithAllStudents = parseFloat($("#HoursWithAllStudents").val());
        var hoursTeacherPlanning = parseFloat($("#HoursTeacherPlanning").val());
        var teachersHourlyRate = parseFloat($("#TeachersHourlyRate").val());
        if (isNaN(teachersHourlyRate)) teachersHourlyRate = 0;
        var totalMiscellaneousCosts = parseFloat($("#totalMiscellaneousCosts").val());

        var totalTeacherHours = hoursWithAllStudents + hoursTeacherPlanning;
        var minHoursPerStudent = maxStudentsCount == 0 ? totalTeacherHours : fpcs.fpcsCourse.round(totalTeacherHours / maxStudentsCount, 4);
        var maxHoursPerStudent = minStudentsCount == 0 ? totalTeacherHours : fpcs.fpcsCourse.round(totalTeacherHours / minStudentsCount, 4);
        var minTotalTeacherCost = fpcs.fpcsCourse.round(minHoursPerStudent * teachersHourlyRate);
        var maxTotalTeacherCost = fpcs.fpcsCourse.round(maxHoursPerStudent * teachersHourlyRate);
        var totalCourseCost = fpcs.fpcsCourse.round(totalTeacherHours * teachersHourlyRate);
        var minTotalDeduction = fpcs.fpcsCourse.round(minTotalTeacherCost + totalMiscellaneousCosts);
        var maxTotalDeduction = fpcs.fpcsCourse.round(maxTotalTeacherCost + totalMiscellaneousCosts);

        $("#totalTeacherHours").val(totalTeacherHours);
        $("#minHoursPerStudent").val(minHoursPerStudent);
        $("#maxHoursPerStudent").val(maxHoursPerStudent);
        $("#minTotalTeacherCost").val(minTotalTeacherCost);
        $("#maxTotalTeacherCost").val(maxTotalTeacherCost);
        $("#totalCourseCost").val(totalCourseCost);
        $("#minTotalDeduction").val(minTotalDeduction);
        $("#maxTotalDeduction").val(maxTotalDeduction);

        $("#totalTeacherHoursStr").html(totalTeacherHours);
        $("#minHoursPerStudentStr").html(minHoursPerStudent);
        $("#maxHoursPerStudentStr").html(maxHoursPerStudent);
        $("#minTotalTeacherCostStr").html("$" + minTotalTeacherCost);
        $("#maxTotalTeacherCostStr").html("$" + maxTotalTeacherCost);
        $("#totalCourseCostStr").html("$" + totalCourseCost);
        $("#minTotalDeductionStr").html("$" + minTotalDeduction);
        $("#maxTotalDeductionStr").html("$" + maxTotalDeduction);

        var enrolledCount = parseInt($("#EnrolledCount").val());
        if (!isNaN(enrolledCount)) {
            var hoursChargedPerStudent = enrolledCount == 0 ? totalTeacherHours : fpcs.fpcsCourse.round(totalTeacherHours / enrolledCount, 4);
            var teacherCostPerStudent = fpcs.fpcsCourse.round(hoursChargedPerStudent * teachersHourlyRate);

            $("#hoursChargedPerStudent").val(hoursChargedPerStudent);
            $("#teacherCostPerStudent").val(teacherCostPerStudent);

            $("#hoursChargedPerStudentStr").html(hoursChargedPerStudent);
            $("#teacherCostPerStudentStr").html("$" + teacherCostPerStudent);
        }
    },

    initChangeTeacher: function () {
        $(document).off("change", "#TeacherId");
        $(document).on("change", "#TeacherId", function(e, opt) {
            var el = $("#TeachersRates");
            if (el.length > 0) {
                var mas = JSON.parse(el.val());
                var rate = mas[opt.selected];
                $("#TeachersHourlyRate").val(rate);
                $("#TeachersHourlyRateStr").val("$" + rate);
                fpcs.fpcsCourse.updateClassCosts();

                $('#GuardianId').find('option').removeAttr('selected').end().trigger('chosen:updated');
                $('#VendorId').find('option').removeAttr('selected').end().trigger('chosen:updated');

                $("#classCosts").show();
                $("#registrationDeadlineDiv").show();
                $("#minMaxStudentsGradesDiv").show();
                $("#scheduleRepetitionDiv").show();
            }
        });
    },

    initChangeGuardian: function () {
        $(document).off("change", "#GuardianId");
        $(document).on("change", "#GuardianId", function (e, opt) {
            var rate = 0;
            $("#TeachersHourlyRate").val(rate);
            $("#TeachersHourlyRateStr").val("$" + rate);
            fpcs.fpcsCourse.updateClassCosts();

            $('#TeacherId').find('option').removeAttr('selected').end().trigger('chosen:updated');
            $('#VendorId').find('option').removeAttr('selected').end().trigger('chosen:updated');

            $("#classCosts").hide();
            $("#registrationDeadlineDiv").hide();
            $("#minMaxStudentsGradesDiv").hide();
            $("#scheduleRepetitionDiv").hide();
        });
    },

    initChangeVendor: function () {
        $(document).off("change", "#VendorId");
        $(document).on("change", "#VendorId", function (e, opt) {
            var rate = 0;
            $("#TeachersHourlyRate").val(rate);
            $("#TeachersHourlyRateStr").val("$" + rate);
            fpcs.fpcsCourse.updateClassCosts();

            $('#GuardianId').find('option').removeAttr('selected').end().trigger('chosen:updated');
            $('#TeacherId').find('option').removeAttr('selected').end().trigger('chosen:updated');

            $("#classCosts").hide();
            $("#registrationDeadlineDiv").hide();
            $("#minMaxStudentsGradesDiv").hide();
            $("#scheduleRepetitionDiv").hide();
        });
    },

    initChangeASDCourse: function () {
        $(document).off("change", "#ASDCourseId");
        $(document).on("change", "#ASDCourseId", function (e, opt) {
            if (opt != null || opt != undefined) {
                fpcs.fpcsCourse.initChangeASDCourseMethod(opt.selected);
            }
            else {
                return 0;
            }
        });
    },

    initChangeASDCourseMethod: function(prm) {
        var asdCourse = "";
        var asdCourseId = 0;

        asdCourse = $('#ASDCourseId2').find('option[value=' + prm + ']').text();
        asdCourseId = prm;

        if (asdCourse == null || asdCourse == '') return 0;

        var name = asdCourse;
        var additionalCourse = $("#SubjectId option:selected").text();
        if (additionalCourse != null && additionalCourse != "") {
            name = name + " - " + additionalCourse;
        }

        $("#Name").val(name);
        $("#Name").attr("value", name);

        if (asdCourseId != 0) {
            var credit = $("#asdCourseHid_credit_" + asdCourseId).val();
            var description = $("#asdCourseHid_description_" + asdCourseId).val();

            $("#ASDCourseCredit").val(credit);
            $("#ASDCourseCredit").attr("value", credit);
            $("#ASDCourseDescription").val(description);
            $("#ASDCourseDescription").attr("value", description);
        }
    },

    initChangeAdditionalSubject: function () {
        $(document).off("change", "#SubjectId");
        $(document).on("change", "#SubjectId", function (e, opt) {
            $('#ASDCourseId').trigger("liszt:updated");
            var asdCourseId = $('#ASDCourseId option:selected').val();
            var asdCourse = $('#ASDCourseId2').find('option[value=' + asdCourseId + ']').text();
            
            if (asdCourse == null || asdCourse == '') return 0;

            var name = asdCourse;
            var additionalCourse = $("#SubjectId option:selected").text();
            if (additionalCourse != null && additionalCourse != "") {
                name = name + " - " + additionalCourse;
            }

            $("#Name").val(name);
            $("#Name").attr("value", name);
        });
    },
    
    round: function (number, X) {
        // rounds number to X decimal places, defaults to 2
        X = (!X ? 2 : X);
        //return Math.floor(number*Math.pow(10,X))/Math.pow(10,X);
        return Math.round(number * Math.pow(10, X)) / Math.pow(10, X);
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }
}