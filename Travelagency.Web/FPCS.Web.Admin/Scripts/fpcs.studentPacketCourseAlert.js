fpcs.studentPacketCourseAlert = {

    initDeleteAlert: function () {
        $(document).off("click", ".gridRowDeleteAlert");

        $(document).on("click", ".gridRowDeleteAlert", function (e) {
            var id = $(this).attr("rowid");
            var url = "/StudentPacketCourseAlert/Delete/" + id;
            fpcs.executeService(url, null, function () {
                fpcs.studentPacketCourseAlert.reloadGrid();
                $('#formAlert').html('');
            });
        });
    },

    showDetailsAlertDialog: function (id) {
        fpcs.getPartial('/StudentPacketCourseAlert/_Details/' + id, function (data, textStatus) {
            fpcs.showInternalDialog("#formAlert", data);
            fpcs.studentPacketCourseAlert.initActionAlert();
        });
    },

    initActionCreateAlert: function () {
        $(document).off("click", ".createAlert");

        $(document).on("click", ".createAlert", function (e) {
            e.preventDefault();
            fpcs.sendForm("createAlertForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.studentPacketCourseAlert.reloadGrid();
                    $("#formAlert").html('');
                }
                else {
                    $("#formAlert").html(data);
                }
            });
        });

        $(document).off("click", ".cancelAlert");

        $(document).on("click", ".cancelAlert", function (e) {
            $('#formAlert').html('');
        });
    },

    initCreateAlertDialog: function () {
        $(document).on("click", "#addAlertDialog", function (e) {
            fpcs.studentPacketCourseAlert.showCreateAlertDialog();
        });
    },

    showCreateAlertDialog: function () {
        fpcs.getPartial('/StudentPacketCourseAlert/_CreateAlert/?studentPacketCourseId=' + $("#studentPacketCourseId").val(), function (data, textStatus) {
            fpcs.showInternalDialog("#formAlert", data);
        });
    },
    
    reloadGrid: function () {
        fpcs.getPartial('/StudentPacketCourseAlert/_TableAlert?studentPacketCourseId=' + $("#studentPacketCourseId").val(),
        function (data, textStatus) {
            fpcs.showInternalDialog("#tableAlert", data);
            fpcs.studentPacketCourseAlert.initDeleteAlert();
        });
    }
}