fpcs.dashboard = {

    initGuardianPage: function () {
        $(document).off("click", ".btnStudentPacketBudget");
        $(document).on("click", ".btnStudentPacketBudget", function (e) {
            var id = $(this).parents("tr").find(".hdnStudent").val();
            location.href = "/StudentPacket2/Index/" + id;
        });

        $(document).off("click", ".btnTransferManager");
        $(document).on("click", ".btnTransferManager", function (e) {
            var id = $(this).parents("tr").find(".hdnStudent").val();
            location.href = "/Transfer/Index/" + id;
        });

        $(document).off("click", ".btnStudentProfile");
        $(document).on("click", ".btnStudentProfile", function (e) {
            var id = $(this).parents("tr").find(".hdnStudent").val();
            
            fpcs.student.showEditDialog(id);
        });

        $(document).off("click", "#btnFPCSCourse");
        $(document).on("click", "#btnFPCSCourse", function (e) {
            location.href = "/FPCSCourse/Index/";
        });

        $(document).off("click", "#btnTeacher");
        $(document).on("click", "#btnTeacher", function (e) {
            location.href = "/Teacher/Index/";
        });

        $(document).off("click", "#btnVendor");
        $(document).on("click", "#btnVendor", function (e) {
            location.href = "/Vendor/Index/";
        });

        $(document).off("click", "#btnGrades");
        $(document).on("click", "#btnGrades", function (e) {
            location.href = "/Grade/Index/";
        });

        $(document).off("click", "#btnFamilyManager");
        $(document).on("click", "#btnFamilyManager", function (e) {
            location.href = "/Family/DetailsForGuardian/";
        });

        $(document).off("click", "#btnReimbursement");
        $(document).on("click", "#btnReimbursement", function (e) {
            var id = $(this).attr("data-family-id");
            fpcs.getPartial('/Family/_PrintReimbursement/' + id, function (data, textStatus) {
                fpcs.showDialog("Print form", data);
            });
        });
    }
}