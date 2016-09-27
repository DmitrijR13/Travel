fpcs.vendor = {

    initIndexPage: function () {
        var colNames = [];
        var cols = [];

        if (fpcs.getIsGuardian() || fpcs.getIsTeacher()) {
            colNames = ['ID', 'Name', 'Address', 'Phone'];
            cols = [
                { name: 'VendorId', index: 'VendorId', key: true, hidden: true },
                { name: 'Name', index: 'Name', width: 120 },
                { name: 'Address', index: 'Address', width: 130 },
                { name: 'Phone', index: 'Phone', width: 60 }
            ];
        }
        else {
            colNames = ['ID', 'Name', 'Contact Name', 'Vendor Type', 'Status', 'Address', 'Phone', 'Email', 'Website', 'Services', 'FileStoreId', 'Actions'];
            cols = [
                { name: 'VendorId', index: 'VendorId', key: true, hidden: true },
				{ name: 'Name', index: 'Name', width: 100 },
                { name: 'ContactName', index: 'ContactName', width: 80 },
                {
                    name: 'VendorType', index: 'VendorType', width: 65,
                    stype: "select",
                    searchoptions: {
                        value: "-1:All;10:For-Profit;20:Non-Profit;",
                        defaultValue: "-1"
                    }
                },
				{
				    name: 'Status', index: 'Status', width: 70,
				    stype: "select",
				    searchoptions: {
				        value: "-1:All;10:Approved;20:Pending;30:Rejected;40:Removed;50:Approved, Pending & Removed;",
				        defaultValue: "-1"
				    }
				},
                { name: 'Address', index: 'Address', width: 110 },
                { name: 'Phone', index: 'Phone', width: 60 },
                { name: 'Email', index: 'Email', width: 110 },
                { name: 'Website', index: 'Website', width: 60, hidden: true },
                {
                    name: 'Services', index: 'Services', width: 150,
                    stype: "select",
                    searchoptions: {
                        value: ":All;" + $("#stypeServices").val(),
                        defaultValue: ""
                    }, hidden: true
                },
                { name: 'FileStoreId', index: 'FileStoreId', hidden: true },
				{ name: 'act', index: 'act', width: 125, fixed: true, sortable: false, resize: false, search: false }
            ];
        }

        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "Vendor",
            showDetailsButton: false,
            rowNum: 100,
            showEditButton: fpcs.getIsAdmin(),
            showDeleteButton: fpcs.getIsAdmin(),
            url: "/Vendor/_Index",
            sortname: 'Name',
            jsonReader: {
                repeatitems: false,
                id: "VendorId"
            },
            colNames: colNames,
            colModel: cols,
            multiselect: false,
            gridComplete: function () {
                var ids = grid.jqGrid('getDataIDs');
                for (var i = 0; i < ids.length; i++) {
                    var cl = ids[i];

                    var row = grid.getRowData(cl);

                    var showEditButton = fpcs.getIsAdmin();
                    var showDeleteButton = fpcs.getIsAdmin();
                    var showWebsite = row.Website != '' && row.Website != null;
                    var showAddFile = fpcs.getIsAdmin();
                    var showDeleteFile = fpcs.getIsAdmin();
                    var showDownload = fpcs.getIsAdmin();
                    //var showAddFile = false;
                    //var showDeleteFile = false;
                    //var showDownload = false;

                    var edit = !showEditButton ? '' : '<td title="Edit"><div rowid="' + cl + '" class="ui-pg-div gridRowEdit"><span class="ui-icon icon-pencil blue"></span></div></td>';
                    var del = !showDeleteButton ? '' : '<td title="Delete"><div rowid="' + cl + '" class="ui-pg-div gridRowDelete"><span class="ui-icon icon-trash red"></span></div></td>';
                    var toWeb = !showWebsite ? '' : '<td title="To Website"><div rowid="' + cl + '" class="ui-pg-div gridRowWebsite"><span class="ui-icon icon-external-link green"></span></div></td>';
                    var print = '<td title="Print"><div rowid="' + cl + '" class="ui-pg-div gridRowPrint"><span class="ui-icon icon-print green"></span></div></td>';

                    var upload = !showAddFile || row["FileStoreId"] != '' ? '' : '<td title="Upload File"><div rowid="' + cl + '" class="ui-pg-div gridRowUpload"><span class="ui-icon icon-upload green"></span></div></td>';
                    var delfile = !showDeleteFile || row["FileStoreId"] == '' ? '' : '<td title="Delete File"><div rowid="' + cl + '" class="ui-pg-div gridRowDelFile"><span class="ui-icon icon-remove red"></span></div></td>';
                    var download = !showDownload || row["FileStoreId"] == '' ? '' : '<td title="Download File"><div rowid="' + cl + '" class="ui-pg-div gridRowShowFile"><span class="ui-icon icon-download blue"></span></div></td>';

                    var table = '<table class="gridRowActions"><tbody><tr>' + edit + del + print + toWeb + upload + delfile + download + '</tr></tbody></table>';
                    grid.jqGrid('setRowData', ids[i], { act: table });
                }
            }
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("Vendor");

        if (fpcs.getIsAdmin()) {
            fpcs.jqGrid.initNavButtons("/Vendor/DeleteAll", fpcs.vendor.showCreatePage, "Add new vendor");
        }

        fpcs.vendor.initShowEditPage();
        fpcs.vendor.initDeleteOneEntity();
        fpcs.vendor.initToWebsiteButton();
        fpcs.vendor.initPrintVendor();
        fpcs.vendor.initLoadFilePage();
        fpcs.vendor.initDelFileButton();
        fpcs.vendor.initShowFileButton();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("Vendor");
        });
    },

    showCreatePage: function () {
        //location.href = "/Vendor/Create";
        fpcs.getPartial('/Vendor/Create/', function (data, textStatus) {
            fpcs.showDialog("Vendor", data, '85%');
            fpcs.vendor.initVendorCreateEditPages();
            fpcs.initDatePicker();
        });
    },

    initShowEditPage: function () {
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            //location.href = "/Vendor/Edit/" + id;
            fpcs.getPartial('/Vendor/Edit/' + id, function (data, textStatus) {
                fpcs.showDialog("Vendor", data, '85%');
                fpcs.vendor.initVendorCreateEditPages();
                fpcs.initDatePicker();
            });
        });
    },

    initLoadFilePage: function (id) {
        $(document).on("click", ".gridRowUpload", function (e) {
            var id = $(this).attr("rowid");
            //location.href = "/Vendor/Edit/" + id;
            fpcs.getPartial('/Vendor/LoadFile/' + id, function (data, textStatus) {
                fpcs.showDialog("LoadFile", data, '25%');
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/Vendor/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fpcs.vendor.reloadGrid();
            });
        });
    },

    initDelFileButton: function () {
        $(document).off("click", ".gridRowDelFile");
        $(document).on("click", ".gridRowDelFile", function (e) {
            var id = $(this).attr("rowid");
            var fileStoreId = $("#" + id).find('td').eq(10).text();
            var url = "/Vendor/DeleteFile?fileStoreId=" + fileStoreId +
                                        "&vendorId=" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fpcs.vendor.reloadGrid();
            });
        });
    },

    initShowFileButton: function () {
        $(document).off("click", ".gridRowShowFile");
        $(document).on("click", ".gridRowShowFile", function (e) {
            var id = $(this).attr("rowid");
            var fileStoreId = $("#" + id).find('td').eq(10).text();
            var url = "/Vendor/DownloadFileFromBlob?fileStoreId=" + fileStoreId;
            fpcs.executeService(url, null, function (data) {
                location.href = "/Pdf/Get?guid=" + data.Guid +
                                        "&fileName=" + data.Name;
            });
        });
    },

    initToWebsiteButton: function () {
        $(document).off("click", ".gridRowWebsite");
        $(document).on("click", ".gridRowWebsite", function (e) {
            var id = $(this).attr("rowid");
            var row = grid.getRowData(id);
            window.open("http://" + row.Website + "/", "_blank");
        });
    },

    initPrintVendor: function () {
        $(document).on("click", ".gridRowPrint", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/Vendor/Print/' + id, function (data, textStatus) {
                fpcs.showDialog("Vendor", data, '85%');
            });
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    },

    initVendorCreateEditPages: function () {
        $('textarea[class*=autosize]').autosize({ append: "\n" });
        $(".chosen-select").chosen();
        fpcs.vendor.initVendorServices();

        $(document).off("click", ".vendorSend");
        $(document).on("click", ".vendorSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("vendorForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.vendor.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Vendor", data, '85%');

                    $('textarea[class*=autosize]').autosize({ append: "\n" });
                    $(".chosen-select").chosen();
                    fpcs.vendor.initVendorServices();
                }
            });
        });

        $(document).off("click", ".cancelSend");
        $(document).on("click", ".cancelSend", function (e) {
            fpcs.closeDialog();
        });
    },

    initVendorServices: function () {
        $("#servicesSelect").chosen().change(function (arg, opt) {
            var url = "/Vendor/_VendorServicePartial/";
            fpcs.vendor.addServiceToVendor(this, opt.selected, url, "services-feed");
        });

        if ($("#ddlVendorType").val() == "Goods") {
            $(".element-hidden").hide();
            $("#VendorUnitType").val('Other');
            $("#EmployerIdentification").val('Empty');
        }

        $(document).off("change", "#ddlVendorType");

        $(document).on("change", "#ddlVendorType", function (e) {
            var val = $(this).val();

            if (val == "Goods") {
                $(".element-hidden").hide();
                $("#VendorUnitType").val('Other');
                $("#EmployerIdentification").val('Empty');
            }
            else {
                $(".element-hidden").show();
                $("#VendorUnitType").val('');
                $("#EmployerIdentification").val('');
            }
        });
    },

    addServiceToVendor: function (select, optId, url, containerId) {
        fpcs.getPartial(url + optId, function (data, textStatus) {
            if (data.ErrorCode != undefined && data.ErrorCode == 500) {
                fpcs.errorAlert();
                $(select).val('').trigger('chosen:updated');
            }
            else {
                $("#" + containerId).append(data);
                $(select).find("option[value='" + optId + "']").remove();
                $(select).val('').trigger('chosen:updated');
            }
        });
    },

    delServiceFromVendor: function (obj) {
        var container = $(obj).closest("div.profile-activity");
        var id = container.children("input[id*=ServiceId]").val();
        var name = container.children("input[id*=Name]").val();

        var select = $(obj).closest("div.widget-box").find(".widget-header h4 select");
        select.prepend("<option value='" + id + "'>" + name + "</option>");
        $(select).trigger('chosen:updated');

        container.remove();
        return false;
    }

}