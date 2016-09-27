fpcs.dataStudentPacket = {

    initDetailsPage: function () {
        fpcs.goodService.initCreateGoodServiceDialog(0);
        fpcs.goodService.initDetailsGoodServiceDialog(0);
        fpcs.goodService.initDeleteGoodService(0);
        fpcs.goodService.initPrintGoodService($("#studentPacketCourseId").val(), $("#courseId").val());

        fpcs.studentPacketCourseAlert.initCreateAlertDialog();
        fpcs.studentPacketCourseAlert.initDeleteAlert();
    },
    
    showDetailDialog: function (id) {
        fpcs.getPartial('/FPCSStudentPacket/_Details?studentPacketCourseId=' + id, function (data, textStatus) {
            fpcs.showDialog("Details Student Packet Course", data, null, true);

            if (fpcs.getIsGuardian()) {
                $("#enrollmentListTab").remove();
                $("#enrollmentList").remove();

                var semester = $("#hdnNumberSemester").val();
                var studentPacketCourseId = $("#studentPacketCourseId").val();
                
                if (semester == 1) {
                    var sponsorSignature = $("#sponsorSignatureSem1").val();
                    //fpcs.dataStudentPacket.hideLIGoodService(studentPacketCourseId, sponsorSignature);
                }
                else if (semester == 2) {
                    var sponsorSignature = $("#sponsorSignatureSem2").val();
                    //fpcs.dataStudentPacket.hideLIGoodService(studentPacketCourseId, sponsorSignature);
                }
            }
        });
    },

    showReviewDialog: function (id) {
        fpcs.getPartial('/FPCSStudentPacket/_Reviews?studentPacketCourseId=' + id, function (data, textStatus) {
            fpcs.showDialog("Review Student Packet Course", data, null, true);

            if (fpcs.getIsGuardian()) {
                $("#enrollmentListTab").remove();
                $("#enrollmentList").remove();

                var semester = $("#hdnNumberSemester").val();
                var studentPacketCourseId = $("#studentPacketCourseId").val();

                if (semester == 1) {
                    var sponsorSignature = $("#sponsorSignatureSem1").val();
                    //fpcs.dataStudentPacket.hideLIGoodService(studentPacketCourseId, sponsorSignature);
                }
                else if (semester == 2) {
                    var sponsorSignature = $("#sponsorSignatureSem2").val();
                    //fpcs.dataStudentPacket.hideLIGoodService(studentPacketCourseId, sponsorSignature);
                }
            }
        });
    },

    initSaveSign: function () {
        $(document).on("click", ".editSignSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editSignForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    //var id = $("#StudentId").val();
                    //location.href = "/StudentPacket/Index/" + id;
                    var url = data.Obj.substr(1, data.Obj.length - 2);
                    location.href = url;
                }
                else {
                    fpcs.showDialog("Save sign", data);
                }
            });
        });
    },

    hideLIGoodService: function (studentPacketCourseId, sponsorSignature) {
        if (studentPacketCourseId != 0 && sponsorSignature == "Sign") {
            $("#liGoodAndService").show();
        }
        else {
            $("#liGoodAndService").hide();

            $("#liGoodAndService").removeClass('active');
            $("#goodAndService").removeClass('in active');

            $("#liILP").addClass('active');
            $("#ilp").addClass('in active');
        }
    }
}