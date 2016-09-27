fpcs.enrollmentList = {
    
    initAction: function () {
        $(document).off("click", ".cancelEnrollmentList");
        $(document).on("click", ".cancelEnrollmentList", function (e) {
            fpcs.closeDialog();
        });

        $(document).off("click", ".sendTeacher");
        $(document).on("click", ".sendTeacher", function (e) {
            e.preventDefault();

            var params = [];

            if ($("#InstructedByEmail").val() == "") {
                alert("No email teacher!");
                return;
            }

            params.push($("#InstructedByEmail").val());
            
            fpcs.executeService("/FPCSStudentPacket/SendEmailEnrollmentList", params, function (data) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    var dataObj = JSON.parse(data.Obj);

                    var url = "mailto:" + dataObj.To;
                    var parameters = new Array();
                    parameters["subject"] = dataObj.Subject;
                    parameters["body"] = dataObj.Body;
                    
                    window.location.href = fpcs.buildUrl(url, parameters);
                }
                else {
                    fpcs.showErrorMessage("ERROR! Email(s) not send");
                }

                return true;
            });
        });

        $(document).off("click", ".sendChecked");
        $(document).on("click", ".sendChecked", function (e) {
            e.preventDefault();

            var params = [];
            var checkedBox = $(".cbEmailChecked:checked");

            if (checkedBox.length == 0) {
                alert("No checked elements!");
                return;
            }

            $.each(checkedBox, function (ind, val) {
                params.push($(val).siblings(".hdnStudentsGuardiansEmail").val());
            });

            fpcs.executeService("/FPCSStudentPacket/SendEmailEnrollmentList", params, function (data) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    var dataObj = JSON.parse(data.Obj);
                    
                    var url = "mailto:" + dataObj.To;
                    var parameters = new Array();
                    parameters["subject"] = dataObj.Subject;
                    parameters["body"] = dataObj.Body;

                    window.location.href = fpcs.buildUrl(url, parameters);
                }
                else {
                    fpcs.showErrorMessage("ERROR! Email(s) not send");
                }

                //fpcs.closeDialog();
                return true;
            });
        });

        $(document).off("click", ".print");
        $(document).on("click", ".print", function (e) {
            e.preventDefault();

            var studentPacketCourseId = $("#StudentPacketCourseId").val();
            fpcs.getPartial('/FPCSStudentPacket/_PrintEnrollmentList?studentPacketCourseId=' + studentPacketCourseId, function (data, textStatus) {
                fpcs.showDialog("Print form", data);
            });
        });
    }
}