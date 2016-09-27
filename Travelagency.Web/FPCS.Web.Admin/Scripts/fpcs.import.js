fpcs.import = {

    setBetweenYears: function () {
        var fromYearId = $("#FromSchoolYearId").val();
        var toYearId = $("#ToSchoolYearId").val();

        fpcs.showLoader();
        fpcs.executeService("/Import/BetweenYears",
            {
                fromSchoolYearId: fromYearId,
                toSchoolYearId: toYearId
            },
            function (data) {
                fpcs.hideLoader();
                if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 200) {
                    var obj = JSON.parse(data.Obj);
                    location.href = "/Import/ReadyYears?message=" + obj.message +
                                    "&title=" + obj.title +
                                    "&countStudent=" + obj.countStudent +
                                    "&countTeacher=" + obj.countTeacher +
                                    "&countGuardian=" + obj.countGuardian +
                                    "&countFamily=" + obj.countFamily +
                                    "&countASDCourse=" + obj.countASDCourse +
                                    "&countVendor=" + obj.countVendor;
                }
                else if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 500) {
                    fpcs.showErrorMessage(data.Message);
                }
            }
        );
    }
}