fpcs.jqGrid = {

    showDetailsButton: true,
    showEditButton: true,
    showDeleteButton: true,
    showEditRowButtons: false,
    gridWrapper: "",
    gridSelector: "",
    pagerSelector: "",
    wrapper: null,
    grid: null,
    pager: null,
    gridComplete: null,
    postData: null,
    toppager: true,

    initGrid: function (options) {
        gridWrapper = options["gridWrapper"];
        gridSelector = options["gridSelector"];
        pagerSelector = options["pagerSelector"];
        postData = options["postData"];
        wrapper = jQuery(gridWrapper);
        grid = jQuery(gridSelector);
        pager = jQuery(pagerSelector);
        emptyMsgDiv = $("<div>No records were found</div>");
        lastSel = '';
        localStorageId = options["localStorageId"];
        rowNum = options["rowNum"];
        if (rowNum == null) {
            rowNum = 10;
        } 
        toppager = options["toppager"];
        if (toppager === undefined) {
            toppager = false;
        }
        var options = jQuery.extend({
            showDetailsButton: true,
            showEditButton: true,
            showDeleteButton: true,
            showEditRowButtons: false,
		    rowButtons: null,

		    url: "#",
			datatype: "json",
			mtype: "POST",

			sortname: 'id',
			sortorder: "asc",
			jsonReader: {
				repeatitems: false,
				id: "id"
			},

			emptyrecords: "No records were found",

			postData: JSON.stringify(postData),

			altRows: true,
			multiselect: options["multiselect"] != null && options["multiselect"] != undefined ? options["multiselect"] : true,
			//multikey: "ctrlKey",
			multiboxonly: true,
			viewrecords: true,

			height: 'auto',
			autowidth: true,
			shrinkToFit: true,

			pager: pager,
			toppager: toppager,
			rowNum: rowNum,
			rowList: [10, 20, 50, 100, 100000],

			loadComplete: function () {
				var table = this;
				setTimeout(function () {
					//  styleCheckbox(table);
					//  updateActionIcons(table);
					fpcs.jqGrid.updatePagerIcons(table);
					fpcs.jqGrid.enableTooltips(table);
				}, 0);

				if (table.p.reccount === 0) {
				    $(this).hide();
				    emptyMsgDiv.show();
				} else {
				    $(this).show();
				    emptyMsgDiv.hide();
				}

			    $("option[value=100000]").text('All');
			},

			beforeRequest: function () {
			    var loadedGridDataAsString = localStorage.getItem(localStorageId);
			    if (loadedGridDataAsString != null) {
			        var gridInfo = $.parseJSON(loadedGridDataAsString);

			        var grid = $(gridSelector);

			        grid.jqGrid('setGridParam', { url: gridInfo.url });
			        grid.jqGrid('setGridParam', { sortname: gridInfo.sortname });
			        grid.jqGrid('setGridParam', { sortorder: gridInfo.sortorder });
			        grid.jqGrid('setGridParam', { selrow: gridInfo.selrow });
			        grid.jqGrid('setGridParam', { page: gridInfo.page });
			        grid.jqGrid('setGridParam', { rowNum: gridInfo.rowNum });
			        grid.jqGrid('setGridParam', { postData: gridInfo.postData });
			        grid.jqGrid('setGridParam', { search: gridInfo.search });

			        //setTimeout(function () {
			        //    $(gridSelector).jqGrid().trigger("reloadGrid");
			        //}, 100);
			    }
			},

			beforeSelectRow: function (rowid, e) {
			    grid.setSelection(rowid, true);
			    return false;
			},

			onSelectRow: function (id) {
			},

			ondblClickRow: function (id) {
			    if (showEditButton) {
			        $("div.gridRowEdit[rowid='" + id + "']").trigger('click');
			    }
			    else if (showDetailsButton) {
			        $("div.gridRowDetails[rowid='" + id + "']").trigger('click');
			    }
			},

			gridComplete:
                function () {
				    var ids = grid.jqGrid('getDataIDs');
				    for (var i = 0; i < ids.length; i++) {
				        var cl = ids[i];
				        var row = grid.getRowData(cl);

				        var details = '';
				        if (!fpcs.getIsAdmin()) {
				            details = !showDetailsButton ? '' : '<td title="View details"><div rowid="' + cl + '" class="ui-pg-div gridRowDetails"><span class="ui-icon icon-zoom-in grey"></span></div></td>';
				        }

				        var edit = !showEditButton ? '' : '<td title="Редактировать"><div rowid="' + cl + '" class="ui-pg-div gridRowEdit"><span class="ui-icon icon-pencil blue"></span></div></td>';
				        var del = !showDeleteButton ? '' : '<td title="Удалить"><div rowid="' + cl + '" class="ui-pg-div gridRowDelete"><span class="ui-icon icon-trash red"></span></div></td>';

				        var rowButtons = "";
				        var rowButtonsConfigs = options["rowButtons"];
				        if (rowButtonsConfigs != null) {
				            $.each(options["rowButtons"], function (indx, value) {
				                //if (value.rowClass != null && value.rowClass != undefined) {
				                if (value != null) {
				                    if (!value.reimbReq) {
				                        if (value.typeButton == "link") {
				                            var text = value.text != undefined && value.text != null ? value.text : '';
				                            rowButtons += '<td title="' + value.title + '"><div rowid="' + cl + '" class="ui-pg-div ' + value.rowClass + '"><a href="#" class="ui-icon ' + value.rowIcon + '" type="button" >' + text + '</a></div></td>';
				                        }
				                        else {
				                            var text = value.text != undefined && value.text != null ? value.text : '';
				                            rowButtons += '<td title="' + value.title + '"><div rowid="' + cl + '" class="ui-pg-div ' + value.rowClass + '"><span class="ui-icon ' + value.rowIcon + '">' + text + '</span></div></td>';
				                        }
				                    } else {
				                        if (value != null
                                                && ((row["RequisitionOrReimbursement"] == 'Reimb' && value.text == "Reimb")
                                                || (row["RequisitionOrReimbursement"] == 'Req' && value.text == "Req"))
                                            ) {
				                            var text = value.text != undefined && value.text != null ? value.text : '';
				                            rowButtons += '<td title="' + value.title + '"><div rowid="' + cl + '" class="ui-pg-div ' + value.rowClass + '"><a href="#" class="ui-icon ' + value.rowIcon + '" type="button" >' + text + '</a></div></td>';
				                        }
				                    }
				                }
				            });
				        }

				        var table = '<table class="gridRowActions"><tbody><tr>' + rowButtons + details + edit + del + '</tr></tbody></table>';
				        grid.jqGrid('setRowData', ids[i], { act: table });
				}

				if (showEditRowButtons) {
				    var ids = grid.jqGrid('getDataIDs');
				    for (var i = 0; i < ids.length; i++) {
				        var cl = ids[i];
				        //be = "<input style='height:22px;width:20px;' type='button' value='E' onclick=\"jQuery('" + gridSelector + "').editRow('" + cl + "');\"  />";
				        se = "<input style='height:22px;width:45px;' type='button' value='Save' onclick=\"jQuery('" + gridSelector + "').saveRow('" + cl + "');\"  />";
				        //ce = "<input style='height:22px;width:20px;' type='button' value='C' onclick=\"jQuery('" + gridSelector + "').restoreRow('" + cl + "');\" />";
				        grid.jqGrid('setRowData', ids[i], { actR: se });
				    }
				}

			}
		}, options);

	    showDetailsButton = options["showDetailsButton"],
	    showEditButton = options["showEditButton"],
	    showDeleteButton = options["showDeleteButton"],
        showEditRowButtons = options["showEditRowButtons"],
        gridComplete = options["gridComplete"],

        options.jsonReader.records = function (obj) {
            return obj.totalRecordsCount;
        };

		grid.jqGrid(options);
	    grid.parent().nextAll().remove();
	    emptyMsgDiv.insertAfter(grid.parent());
	},

	initGridResize: function () {
		jQuery(window).bind('resize', function () {
			// Get width of parent container
		    var width = wrapper.width();
            
			if (width == null || width < 1) {
				// For IE, revert to offsetWidth if necessary
				//width = wrapper.attr('offsetWidth');
			}
			width = width - 2; // Fudge factor to prevent horizontal scrollbars
			if (width > 0 &&
				// Only resize if new width exceeds a minimal threshold
				// Fixes IE issue with in-place resizing when mousing-over frame bars
				Math.abs(width - grid.width()) > 5) {
				grid.setGridWidth(width);
			}

		}).trigger('resize');
	},

	initFilterToolbar: function (localStorageId, options) {
		var options = jQuery.extend({
			//defaultSearch: 'cn',
			searchOnEnter: true,
			stringResult: false
		}, options);

		grid.jqGrid('filterToolbar', options);

		var loadedGridDataAsString = localStorage.getItem(localStorageId);
	    // Use the default value if no data exists in localStorage
		if (loadedGridDataAsString != null) {
		    var gridInfo = $.parseJSON(loadedGridDataAsString);
		    var items = gridInfo.postData;
		    $.each(items, function (index, value) {
		        if ($("#gs_" + index) != undefined) {
		            $("#gs_" + index).val(value);
		        }
		    });
		    window.localStorage.removeItem(localStorageId);
		}
	},

	initNavButtons: function (deleteUrl, addEntityFunc, addEntityFuncTitle) {
	    var grid = jQuery(gridSelector).jqGrid('navGrid', pagerSelector,
		{ 	//navbar options
		    edit: false,
		    add: false,
		    del: deleteUrl == null ? false : true,
		    delicon: 'icon-trash red',
		    search: false,
		    refresh: true,
		    refreshicon: 'icon-refresh green',
		    view: false
		}, {}, {},
		{
		    //delete record form
		    url: deleteUrl,
		    recreateForm: true,
		    beforeShowForm: function (e) {
		        var form = $(e[0]);
		        if (form.data('styled')) return false;

		        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		        fpcs.jqGrid.styleDeleteForm(form);

		        form.data('styled', true);
		    }
		}, {});
	    
	    if (addEntityFunc != null) {
	        grid.jqGrid('navButtonAdd', pagerSelector, {
	            caption: "",
	            title: addEntityFuncTitle != undefined ? addEntityFuncTitle : "Add new entity",
	            buttonicon: "icon-plus-sign purple",
	            onClickButton: function () {
	                addEntityFunc.call();
	            },
	            position: "first"
	        });
	    }
	},

	initNavPrintButton: function (printFunc, caption) {
	    if (caption == undefined)
	        caption = "";

	    grid.jqGrid('navButtonAdd', pagerSelector, {
	        caption: caption,
	        title: "Print",
	        buttonicon: "icon-print red",
	        onClickButton: function () {
	            printFunc.call();
	        }
	    });
	},

	initNavPrintButton2: function (printFunc, title, caption) {
	    grid.jqGrid('navButtonAdd', pagerSelector, {
	        caption: caption,
	        title: title,
	        buttonicon: "icon-print red pdng-print-2",
	        onClickButton: function () {
	            printFunc.call();
	        }
	    });
	},

	initNavCSVButton: function (printFunc) {
	    grid.jqGrid('navButtonAdd', pagerSelector, {
	        caption: "",
	        title: "Download CSV",
	        buttonicon: "icon-download red",
	        onClickButton: function () {
	            printFunc.call();
	        }
	    });
	},

	//private functions
	//----------------------------------------------------------------------------------
	enableTooltips: function (table) {
		$('.navtable .ui-pg-button').tooltip({ container: 'body' });
		$(table).find('.ui-pg-div').tooltip({ container: 'body' });
	},

	//replace icons with FontAwesome icons like above
	updatePagerIcons: function (table) {
		var replacement =
		{
			'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
			'ui-icon-seek-prev': 'icon-angle-left bigger-140',
			'ui-icon-seek-next': 'icon-angle-right bigger-140',
			'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
		};
		$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
			var icon = $(this);
			var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

			if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
		})
	},

	styleDeleteForm: function (form) {
		var buttons = form.next().find('.EditButton .fm-button');
		buttons.addClass('btn btn-small').find('[class*="-icon"]').remove();//ui-icon, s-icon
		buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
		buttons.eq(1).prepend('<i class="icon-remove"></i>')
	},

	saveLocalStorage: function (localStorageId) {
        var gridInfo = {};

        gridInfo.url = grid.jqGrid('getGridParam', 'url');
        gridInfo.sortname = grid.jqGrid('getGridParam', 'sortname');
        gridInfo.sortorder = grid.jqGrid('getGridParam', 'sortorder');
        gridInfo.selrow = grid.jqGrid('getGridParam', 'selrow');
        gridInfo.page = grid.jqGrid('getGridParam', 'page');
        gridInfo.rowNum = grid.jqGrid('getGridParam', 'rowNum');
        gridInfo.postData = grid.jqGrid('getGridParam', 'postData');
        gridInfo.search = grid.jqGrid('getGridParam', 'search');
        gridInfo.prmNames = grid.jqGrid('getGridParam', 'prmNames');
        localStorage.setItem(localStorageId, JSON.stringify(gridInfo));
    }
}