fpcs.teacher = {

	initIndexPage: function () {
		fpcs.jqGrid.initGrid({
			gridWrapper: ".gridWrapper",
			gridSelector: "#gridTable",
			pagerSelector: "#gridPager",
			localStorageId: "Teacher",
			url: "/Teacher/_Index",
            showDetailsButton: fpcs.getIsAdmin() || fpcs.getIsTeacher(),
			showEditButton: fpcs.getIsAdmin(),
			showDeleteButton: fpcs.getIsAdmin(),
			sortname: 'FullName',
			jsonReader: {
				repeatitems: false,
				id: "DbUserId"
			},
			colNames: ['ID', 'Name', 'Email', 'Active?', 'Actions'],
			colModel: [
				{ name: 'DbUserId', index: 'DbUserId', key: true, hidden: true },
				{ name: 'FullName', index: 'FullName', width: 150 },
				{ name: 'Email', index: 'Email', width: 150 },
                { name: 'IsActive', index: 'IsActive', formatter: "checkbox", width: 150 },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false },
			]
		});
		fpcs.jqGrid.initGridResize();
		fpcs.jqGrid.initFilterToolbar("Teacher");

		if (fpcs.getIsAdmin()) {
		    fpcs.jqGrid.initNavButtons("/Teacher/DeleteAll", fpcs.teacher.showCreateDialog, "Add new teacher");
		}

		fpcs.teacher.initDetailsDialog();
		fpcs.teacher.initCreateDialogSend();
		fpcs.teacher.initEditDialog();
		fpcs.teacher.initDeleteOneEntity();

		$(window).unload(function () {
		    fpcs.jqGrid.saveLocalStorage("Teacher");
		});
	},

	showDetailsDialog: function (id) {
	    //location.href = "/Teacher/Details/" + id;
	    fpcs.getPartial('/Teacher/Details/' + id, function (data, textStatus) {
	        fpcs.showDialog("Teacher details", data);
	    });
	},

	initDetailsDialog: function () {
	    $(document).on("click", ".gridRowDetails", function (e) {
	        var id = $(this).attr("rowid");
	        fpcs.teacher.showDetailsDialog(id);
	    });
	},

	showCreateDialog: function () {
	    //location.href = "/Teacher/Create";
	    fpcs.getPartial('/Teacher/Create/', function (data, textStatus) {
	        fpcs.showDialog("Create Teacher", data);
	        fpcs.initDatePicker();
	    });
	},

	initCreateDialogSend: function () {
	    $(document).off("click", ".createTeacherSend");
	    $(document).on("click", ".createTeacherSend", function (e) {
	        e.preventDefault();
	        fpcs.sendForm("createTeacherForm", function (data, textStatus) {
	            if (typeof data == "object" && data.ErrorCode == 200) {
	                fpcs.teacher.reloadGrid();
	                fpcs.closeDialog();
	            }
	            else {
	                fpcs.showDialog("Create Teacher", data);
	            }
	        });
	    });

	    $(document).off("click", ".cancelTeacherSend");
	    $(document).on("click", ".cancelTeacherSend", function (e) {
	        fpcs.closeDialog();
	    });
	},

	showEditDialog: function (id) {
	    fpcs.getPartial('/Teacher/Edit/' + id, function (data, textStatus) {
	        fpcs.showDialog("Edit Teacher", data);
	        fpcs.initDatePicker();
	    });
	},

	initEditDialog: function () {
	    $(document).off("click", ".gridRowEdit");
	    $(document).on("click", ".gridRowEdit", function (e) {
	        var id = $(this).attr("rowid");

	        //location.href = "/Teacher/Edit/" + id;
	        fpcs.teacher.showEditDialog(id);
	    });

	    $(document).off("click", ".editTeacherSend");
	    $(document).on("click", ".editTeacherSend", function (e) {
	        e.preventDefault();
	        fpcs.sendForm("editTeacherForm", function (data, textStatus) {
	            if (typeof data == "object" && data.ErrorCode == 200) {
	                fpcs.teacher.reloadGrid();
	                fpcs.closeDialog();
	            }
	            else {
	                fpcs.showDialog("Edit Teacher", data);
	            }
	        });
	    });
	},

	initDeleteOneEntity: function () {
	    $(document).off("click", ".gridRowDelete");
	    $(document).on("click", ".gridRowDelete", function (e) {
	        var id = $(this).attr("rowid");
	        var url = "/Teacher/Delete/" + id;
	        fpcs.executeServiceWithConfirm(url, null, function () {
	            fpcs.teacher.reloadGrid();
	        });
	    });
	},

	reloadGrid:function () {
	    jQuery("#gridTable").trigger("reloadGrid")
	}

}