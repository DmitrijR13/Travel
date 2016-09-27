fpcs.schoolYear = {

    initSchoolYearCreateEditPages: function () {
        $('.date-picker').datepicker().next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
    },

    initSchoolYearIndexPage: function () {
        $("select#Year").chosen().change(function (arg, opt) {
            location.href = '/SchoolYear/Index?year=' + opt.selected;
        });
    }
}