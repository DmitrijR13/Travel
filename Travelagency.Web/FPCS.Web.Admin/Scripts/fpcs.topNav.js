fpcs.topNav = {

    initSchoolYear: function () {
        $("ul.dropdown-menu").on("click", ".cancelClick", function (e) {
            e.stopPropagation();
        });
        $("ul.dropdown-menu").on("click", "#TopSchoolYear option", function (e) {
            location.href = "/Shared/SetSchoolYear?year=" + $(this).val();
        });
    }

}