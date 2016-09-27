fpcs.transfer = {

    initIndexPage: function () {

        var isEdit = $("#roleCurrentUser").val() * 1 == 1 || $("#isLocked").val() == "False";

		fpcs.jqGrid.initGrid({
			gridWrapper: ".gridWrapper",
			gridSelector: "#gridTable",
			pagerSelector: "#gridPager",
			url: "/Transfer/_Index?studentId=" + $("#studentId").val(),
			showEditButton: false,
			showDeleteButton: isEdit,
			sortname: 'Date',
			jsonReader: {
				repeatitems: false,
				id: "TransferId"
			},
			colNames: ['ID', 'Date', 'Comments', 'Created By', 'From Student', 'To Student', 'Amount', 'Actions'],
			colModel: [
				{ name: 'TransferId', index: 'TransferId', key: true, width: 100, hidden: true },
				{ name: 'DateCreate', index: 'DateCreate', formatter : 'date', formatoptions : { newformat : 'Y-m-d' }, width: 150 },
				{ name: 'Comments', index: 'Comments', width: 150 },
                { name: 'CreatedBy', index: 'CreatedBy', width: 150 },
                { name: 'FromStudent', index: 'FromStudent', width: 150 },
                { name: 'ToStudent', index: 'ToStudent', width: 150 },
                { name: 'Amount', index: 'Amount', width: 150 },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false },
			]
		});

		fpcs.jqGrid.initGridResize();
        //fpcs.jqGrid.initFilterToolbar();

		if (isEdit == true) {
		    fpcs.jqGrid.initNavButtons(null, fpcs.transfer.showCreateTransferDialog, "Add new transfer");
		}

		fpcs.transfer.initDetailsDialog();
		fpcs.transfer.initDeleteOneEntity();
	},
    
	initDetailsDialog: function () {
	    $(document).off("click", ".gridRowDetails");

	    $(document).on("click", ".gridRowDetails", function (e) {
	        var id = $(this).attr("rowid");
	        fpcs.getPartial('/Transfer/_Details/' + id, function (data, textStatus) {
	            fpcs.showDialog("Detail transfer", data);
	        });
	    });
	},

	showCreateTransferDialog: function () {
	    fpcs.getPartial('/Transfer/_Create/' + $("#studentId").val(), function (data, textStatus) {
	        fpcs.showDialog("Create Transfer", data);
	    });
	},

	initCreateDialog: function () {
	    $(document).off("click", ".createTransferSend");
	    $(document).on("click", ".createTransferSend", function (e) {
	        e.preventDefault();
	        fpcs.sendForm("createTransferForm", function (data, textStatus) {
	            if (typeof data == "object" && data.ErrorCode == 200) {
	                fpcs.transfer.reloadGrid();
	                fpcs.closeDialog();
	            }
	            else if (data.ErrorCode != null && data.ErrorCode != undefined && data.ErrorCode == 800) {
	                alert(data.Message);
	            }
	            else {
	                fpcs.showDialog("Create Transfer", data);
	            }
	        });
	    });

	    $(document).off("change", "#FromStudentId");
	    $(document).on("change", "#FromStudentId", function (e) {
	        e.preventDefault();
	        fpcs.transfer.showToFromStudents();
	    });

	    fpcs.transfer.showToFromStudents();
	},
    
	initDeleteOneEntity: function () {
	    $(document).off("click", ".gridRowDelete");
	    $(document).on("click", ".gridRowDelete", function (e) {
	        var id = $(this).attr("rowid");
	        var url = "/Transfer/Delete/" + id;
	        fpcs.executeServiceWithConfirm(url, null, function () {
	            fpcs.transfer.reloadGrid();
	        });
	    });
	},

	showToFromStudents: function () {
	    var fromStudentId = $("#FromStudentId option:selected").val();
	    if (fromStudentId == "00000000-0000-0000-0000-000000000000") {
	        var options = $("#ToStudentId").find("option");
	        var studentId = $("#StudentId").val();
	        $.each(options, function (index, value) {
	            if ($(value).val() != studentId) {
	                $(value).hide();
	            }
	            else {
	                $(value).show();
	            }
	        });

	        $("#ToStudentId option[value='" + studentId + "']").attr('selected', true);
	    }
	    else {
	        var options = $("#ToStudentId").find("option");
	        var studentId = $("#StudentId").val();
	        $.each(options, function (index, value) {
	            if ($(value).val() != studentId) {
	                $(value).show();
	            }
	            else {
	                $(value).hide();
	            }
	        });

	        $("#ToStudentId option[value='00000000-0000-0000-0000-000000000000']").attr('selected', true);
	    }

	    $("#FromStudentId option[value='']").hide();
	    $("#ToStudentId option[value='']").hide();
	},

	reloadGrid:function () {
	    jQuery("#gridTable").trigger("reloadGrid")
	}

}