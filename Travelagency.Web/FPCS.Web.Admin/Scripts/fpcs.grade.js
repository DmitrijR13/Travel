fpcs.grade = {

	initIndexPage: function () {
		fpcs.jqGrid.initGrid({
			gridWrapper: ".gridWrapper",
			gridSelector: "#gridTable",
			pagerSelector: "#gridPager",
			showDeleteButton: false,
			url: "/Grade/_Index",
			sortname: 'StudentName',
			jsonReader: {
				repeatitems: false,
				id: "StudentPacketCourseId"
			},
			colNames: ['StudentPacketCourseId', 'TeacherId', 'GuardianId', 'Student Name', 'Code', 'Course Title', 'Type', 'Teacher Name', 'Guardian Name', '1', '2', '3', 'Q1', '1', '2', '3', 'Q2', 'Sem1', '1', '2', '3', 'Q3', '1', '2', '3', 'Q4', 'Sem2', 'Credits', 'Comment', 'In Zangle', 'Lock', ''],
			colModel: [
				{ name: 'StudentPacketCourseId', index: 'StudentPacketCourseId', key: true, hidden: true },
                { name: 'TeacherId', index: 'TeacherId', hidden: true },
                { name: 'GuardianId', index: 'GuardianId', hidden: true },
				{ name: 'StudentName', index: 'StudentName', width: 200 },
                { name: 'ASDCode', index: 'ASDCode', width: 80 },
                { name: 'CourseTitle', index: 'CourseTitle' },
                { name: 'ClassType', index: 'ClassType', width: 70, sortable: false, search: false },
                { name: 'TeacherName', index: 'TeacherName' },
                { name: 'GuardianName', index: 'GuardianName' },
                { name: 'Q11', index: 'Q11', width: 30, sortable: false, search: false },
                { name: 'Q12', index: 'Q12', width: 30, sortable: false, search: false },
                { name: 'Q13', index: 'Q13', width: 30, sortable: false, search: false },
                { name: 'Q1', index: 'Q1', width: 30, sortable: false, search: false },
                { name: 'Q21', index: 'Q21', width: 30, sortable: false, search: false },
                { name: 'Q22', index: 'Q22', width: 30, sortable: false, search: false },
                { name: 'Q23', index: 'Q23', width: 30, sortable: false, search: false },
                { name: 'Q2', index: 'Q2', width: 30, sortable: false, search: false },
                { name: 'Sem1', index: 'Sem1', width: 50, sortable: false, search: false },
                { name: 'Q31', index: 'Q31', width: 30, sortable: false, search: false },
                { name: 'Q32', index: 'Q32', width: 30, sortable: false, search: false },
                { name: 'Q33', index: 'Q33', width: 30, sortable: false, search: false },
                { name: 'Q3', index: 'Q3', width: 30, sortable: false, search: false },
                { name: 'Q41', index: 'Q41', width: 30, sortable: false, search: false },
                { name: 'Q42', index: 'Q42', width: 30, sortable: false, search: false },
                { name: 'Q43', index: 'Q43', width: 30, sortable: false, search: false },
                { name: 'Q4', index: 'Q4', width: 30, sortable: false, search: false },
                { name: 'Sem2', index: 'Sem2', width: 50, sortable: false, search: false },
                { name: 'Credits', index: 'Credits', width: 60, stype: "select", searchoptions: { value: ":All;0:0;0.25:0.25;0.5:0.50;1:1.00" } },
                { name: 'Comment', index: 'Comment', width: 250, sortable: false, search: false },
                { name: 'IsInSystem', index: 'IsInSystem', width: 80, formatter: 'checkbox', stype: "select", searchoptions: { value: ":All;true:True;false:False" } },
                { name: 'IsLock', index: 'IsLock', width: 70, formatter: 'checkbox', stype: "select", searchoptions: { value: ":All;true:True;false:False" } },
				{ name: 'act', index: 'act', width: 40, fixed: true, sortable: false, resize: false, search: false }
			],
			gridComplete: function () {
			    var ids = grid.jqGrid('getDataIDs');
			    for (var i = 0; i < ids.length; i++) {
			        var cl = ids[i];

			        var row = grid.getRowData(cl);

			        var showEditButton = fpcs.getIsAdmin() ||
                                         (fpcs.getIsTeacher() && row.IsLock == "No") ||
                                         (fpcs.getIsGuardian() && fpcs.getCurrentUserId() == row.GuardianId && row.IsLock == "No");

			        var details = '';
			        if (!fpcs.getIsAdmin()) {
			            details = '<td title="View details"><div rowid="' + cl + '" class="ui-pg-div gridRowDetails"><span class="ui-icon icon-zoom-in grey"></span></div></td>';
			        }

			        var edit = !showEditButton ? '' : '<td title="Edit"><div rowid="' + cl + '" class="ui-pg-div gridRowEdit"><span class="ui-icon icon-pencil blue"></span></div></td>';
			        
			        var table = '<table class="gridRowActions"><tbody><tr>' + details + edit + '</tr></tbody></table>';
			        grid.jqGrid('setRowData', ids[i], { act: table });
			    }
			}
		});

		jQuery("#gridTable").jqGrid('setGroupHeaders', {
		    useColSpanStyle: false,
		    groupHeaders: [
              { startColumnName: 'Q11', numberOfColumns: 3, titleText: '<center>Qtr.1</center>' },
              { startColumnName: 'Q21', numberOfColumns: 3, titleText: '<center>Qtr.2</center>' },
              { startColumnName: 'Q31', numberOfColumns: 3, titleText: '<center>Qtr.3</center>' },
              { startColumnName: 'Q41', numberOfColumns: 3, titleText: '<center>Qtr.4</center>' }
		    ]
		});

		fpcs.jqGrid.initGridResize();
		fpcs.jqGrid.initFilterToolbar();

		fpcs.jqGrid.initNavButtons(null, null);
		fpcs.jqGrid.initNavCSVButton(fpcs.grade.initCSV);

		fpcs.grade.initDetailDialog();
		fpcs.grade.initEditDialog();
	},
    
	initCSV: function () {
	    var params = jQuery("#gridTable").jqGrid('getGridParam', 'postData');
	    fpcs.executeService('/Grade/_CSV/', params, function (data, textStatus) {
	        location.href = '/Grade/Download?guid=' + data;
	    });
	},

	initDetailDialog: function () {
	    $(document).off("click", ".gridRowDetails");
	    $(document).on("click", ".gridRowDetails", function (e) {
	        var id = $(this).attr("rowid");
	        fpcs.getPartial('/Grade/_Details/' + id, function (data, textStatus) {
	            fpcs.showDialog("Details Grade Student Packet Course", data);

	            $(document).off("click", ".download-file");
	            $(document).on("click", ".download-file", function (e) {
	                e.preventDefault();

	                var attrId = $(this).attr("data-id");
	                var attrQ = $(this).attr("data-q");

	                fpcs.executeService("/Grade/DownloadFile", { id: attrId, q: attrQ }, function (data) {
	                    location.href = "/Grade/GetDownloadFile?guid=" + data;
	                });
	            });
	        });
	    });
	},

	initEditDialog: function () {
	    $(document).off("click", ".gridRowEdit");
	    $(document).on("click", ".gridRowEdit", function (e) {
	        var id = $(this).attr("rowid");
	        fpcs.getPartial('/Grade/_Edit/' + id, function (data, textStatus) {
	            fpcs.showDialog("Edit Grade Student Packet Course", data);

	            $("#uploadFileDialog").dialog({
	                resizable: false,
	                draggable: false,
	                modal: true,
	                autoOpen: false,
	                title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>Upload grade</h4></div>",
	                title_html: true,
	                width: "35%",
	                position: ['top', 125]
	            });

	            $(document).off("click", ".upload-file");
	            $(document).on("click", ".upload-file", function (e) {
	                e.preventDefault();
	                var that = this;
	                var attrId = $(this).attr("data-id");
	                var attrQ = $(this).attr("data-q");

	                fpcs.getPartial('/Grade/UploadFile?id=' + attrId + '&q=' + attrQ, function (data, textStatus) {
	                    $("#uploadFileDialog").dialog("open");
	                    $("#uploadFileContent").html(data);
	                    fpcs.grade.initUploadFileGrade(that);
	                });
	            });

	            $(document).off("click", ".download-file");
	            $(document).on("click", ".download-file", function (e) {
	                e.preventDefault();

	                var attrId = $(this).attr("data-id");
	                var attrQ = $(this).attr("data-q");

	                fpcs.executeService("/Grade/DownloadFile", { id: attrId, q: attrQ }, function (data) {
	                    location.href = "/Grade/GetDownloadFile?guid=" + data;
	                });
	            });

	            $(document).off("click", ".remove-file");
	            $(document).on("click", ".remove-file", function (e) {
	                e.preventDefault();
	                var that = this;
	                var attrId = $(this).attr("data-id");
	                var attrQ = $(this).attr("data-q");

	                fpcs.executeService("/Grade/RemoveFile", { id: attrId, q: attrQ }, function (data) {
	                    $(that).parents('ul').find('.download-file').parent('li').hide();
	                    $(that).parents('ul').find('.upload-file').parent('li').show();
	                    $(that).parents('ul').find('.remove-file').parent('li').hide();
	                });
	            });
	        });
	    });
	},
    
	initUploadFileGrade: function (that) {
	    $("#uploadFileGradeForm").submit(function () {
	        var formData = new FormData($(this)[0]);
	        $.ajax({
	            url: "Grade/UploadFile",
	            type: 'POST',
	            data: formData,
	            async: false,
	            success: function (data) {
	                if (typeof data == "object" && data.ErrorCode == 200) {
	                    $("#uploadFileDialog").dialog("close");
	                }
	                else {
	                    $("#uploadFileContent").html(data);
	                    fpcs.grade.initUploadFileGrade();
	                }
	            },
	            cache: false,
	            contentType: false,
	            processData: false
	        });

	        return false;
	    });

	    $(document).off("change", "#uploadFile");
	    $(document).on("change", "#uploadFile", function (e) {
	        e.preventDefault();
	        $("#uploadFileGradeForm").trigger('submit');
	        $(that).parents('ul').find('.download-file').parent('li').show();
	        $(that).parents('ul').find('.upload-file').parent('li').hide();
	        $(that).parents('ul').find('.remove-file').parent('li').show();
	    });

	    //$(document).off("click", ".upload-file-action");
	    //$(document).on("click", ".upload-file-action", function (e) {
	    //    e.preventDefault();
	    //    $("#uploadFileGradeForm").trigger('submit');
	    //    $(that).parents('ul').find('.download-file').parent('li').show();
	    //    $(that).parents('ul').find('.upload-file').parent('li').hide();
	    //    $(that).parents('ul').find('.remove-file').parent('li').show();
	    //});

	    //$(document).off("click", ".cancel-action");
	    //$(document).on("click", ".cancel-action", function (e) {
	    //    e.preventDefault();
	    //    $("#uploadFileDialog").dialog("close");
	    //});
	},

	initEditDialogSend: function () {
	    $(document).off("click", ".editSend");
	    $(document).on("click", ".editSend", function (e) {
	        e.preventDefault();
	        fpcs.sendForm("editForm", function (data, textStatus) {
	            if (typeof data == "object" && data.ErrorCode == 200) {
	                fpcs.grade.reloadGrid();
	                fpcs.closeDialog();
	            }
	            else {
	                fpcs.showDialog("Edit Grade Student Packet Course", data);
	            }
	        });
	    });

	    if (!fpcs.getIsAdmin()) {
	        $("#IsLock").prop("disabled", true);
	    }
	},

	reloadGrid:function () {
	    jQuery("#gridTable").trigger("reloadGrid");
	}
}