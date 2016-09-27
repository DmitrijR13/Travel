fpcs.signedCourse = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            url: "/SignedCourse/_Index",
            sortname: 'StudentGuid',
            showDetailsButton: false,
            showEditButton: false,
            showDeleteButton: false,
            jsonReader: {
                repeatitems: false,
                id: "StudentGuid"
            },
            colNames: ['ID', 'Student Name', 'Grade', 'Home Phone', 'Email', 'GNS', 'SNS', 'INS', 'ANS', 'AMA', 'SA', 'GA', 'Actions'],
            colModel: [
				{ name: 'StudentGuid', index: 'StudentGuid', key: true, hidden: true, search: false },
                { name: 'StudentName', index: 'StudentName', width: 100, search: false },
                { name: 'Grade', index: 'Grade', width: 100, search: false },
                { name: 'HomePhone', index: 'HomePhone', width: 100, search: false },
                { name: 'EmailFamily', index: 'EmailFamily', width: 100, search: false },
                { name: 'GNS', index: 'GNS', width: 100, search: false },
                { name: 'SNS', index: 'SNS', width: 100, search: false },
                { name: 'INS', index: 'INS', width: 100, search: false },
                { name: 'ANS', index: 'ANS', width: 100, search: false },
                { name: 'AMA', index: 'AMA', width: 100, search: false },
                { name: 'SA', index: 'SA', width: 100, search: false },
                { name: 'GA', index: 'GA', width: 100, search: false },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false }
            ],
            rowButtons: [{ title: "Student Packet Manager", rowClass: "gridRowStudentPacket", rowIcon: "icon-suitcase green" }]
        });

        fpcs.jqGrid.initGridResize();
        //fpcs.jqGrid.initFilterToolbar();
        fpcs.jqGrid.initNavButtons(null, null);

        $(document).off("click", ".gridRowStudentPacket");

        $(document).on("click", ".gridRowStudentPacket", function (e) {
            var id = $(this).attr("rowid");
            location.href = "/StudentPacket/Index/" + id;
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid");
    }
}