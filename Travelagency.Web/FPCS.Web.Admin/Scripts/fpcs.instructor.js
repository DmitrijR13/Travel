fpcs.instructor = {

	initIndexPage: function () {
		fpcs.jqGrid.initGrid({
			gridWrapper: ".gridWrapper",
			gridSelector: "#gridTable",
			pagerSelector: "#gridPager",
			showDetailsButton: false,
			showDeleteButton: false,
			url: "/Instructor/_Index",
			sortname: 'StudentName',
			jsonReader: {
				repeatitems: false,
				id: "StudentPacketCourseId"
			},
			colNames: ['StudentPacketCourseId', 'Class Name', 'Student Name', 'Guardians', 'Email', 'Family Phone', 'Guard Sign', 'SponsorSign', 'Instruct Sign', 'Admin Sign', 'Comments', 'Actions'],
			colModel: [
				{ name: 'StudentPacketCourseId', index: 'StudentPacketCourseId', key: true, hidden: true },
				{ name: 'ClassName', index: 'ClassName', width: 150, sortable: false, search: false },
				{ name: 'StudentName', index: 'StudentName', width: 150, sortable: false, search: false },
                { name: 'Guardians', index: 'Guardians', width: 150, sortable: false, search: false },
                { name: 'Email', index: 'Email', width: 150, sortable: false, search: false },
                { name: 'FamilyPhone', index: 'FamilyPhone', width: 150, sortable: false, search: false },
                { name: 'GuardSign', index: 'GuardSign', width: 150, sortable: false, search: false },
                { name: 'SponsorSign', index: 'SponsorSign', width: 150, sortable: false, search: false },
                { name: 'InstructSign', index: 'InstructSign', width: 150, sortable: false, search: false },
                { name: 'AdminSign', index: 'AdminSign', width: 150, sortable: false, search: false },
                { name: 'Comments', index: 'Comments', width: 150, sortable: false, search: false },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false }
			]
		});

		fpcs.jqGrid.initGridResize();

		fpcs.instructor.initEditDialog();
	},
    
	initEditDialog: function () {
	    $(document).off("click", ".gridRowEdit");

	    $(document).on("click", ".gridRowEdit", function (e) {
	        var id = $(this).attr("rowid");
	        fpcs.getPartial('/FPCSStudentPacket/_Sign?studentPacketCourseId=' + id + '&returnHref=/Instructor/Index', function (data, textStatus) {
	            fpcs.showDialog("Edit Instructor Sign", data);
	        });
	    });
	},
    
	reloadGrid:function () {
	    jQuery("#gridTable").trigger("reloadGrid");
	}
}