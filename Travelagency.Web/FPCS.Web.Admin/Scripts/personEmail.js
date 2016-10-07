personEmail = {
    initPersonEmailButton: function () {
        $(document).off("click", ".gridRowPersonEmail");
        $(document).on("click", ".gridRowPersonEmail", function (e) {
            var id = $(this).attr("rowid");
            location.href = "/Person/Info?personId=" + id;
        });
    }
}