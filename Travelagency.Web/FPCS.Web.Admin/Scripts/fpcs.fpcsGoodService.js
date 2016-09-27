fpcs.fpcsGoodService = {

    initIndexPage: function () {
        var lastsel;
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "GoodAndServiceApproval",
            url: "/GoodAndServiceApproval/_Index",
            editurl: "/GoodAndServiceApproval/EditRow",
            sortname: 'StudentsName',
            rowNum: 100,
            showDeleteButton: false,
            showEditRowButtons: false,
            jsonReader: {
                repeatitems: false,
                id: "GoodAndServiceId"
            },
            colNames: [/*'',*/ 'ID', /*'Good/Service',*/'DateCreated', 'Type', 'Students Name', 'IsWithdrawal', 'Family Email', 'Sponsor Teacher Email', 'Vendor Name', 'Item #', 'User', 'Date', 'Date Sponsor Signature', 'Date Guardian Signature', 'Sponsor/ Guardian', 'Guardian Signature', 'Budget', 'Balance', 'Closed', 'Aprv', 'Comments/ Reject Reason', 'Email', 'Semester', 'Actions'],
            colModel: [
                /*{ name: 'actR', index: 'actR', width: 75, sortable: false },*/
				{ name: 'GoodAndServiceId', index: 'GoodAndServiceId', key: true, hidden: true, search: false },
                //{ name: 'GoodOrService', index: 'GoodOrService', width: 100, stype: "select", searchoptions: { value: ":All;0:Good;1:Service" } },
                { name: 'DateCreated', index: 'DateCreated', width: 100, hidden: true },
                {
                    name: 'RequisitionOrReimbursement', index: 'RequisitionOrReimbursement', width: 80, stype: "select", searchoptions: { value: ":All;0:Req;1:Reimb" }, formatter: function (cellvalue, options, rowObject) {
                        if (cellvalue == "Requisition") {
                            return "Req";
                        } else {
                            return "Reimb";
                        }
                    }, cellattr: function (rowId, cellValue, rawObject, cm, rdata) {
                        var value = rawObject["DateCreated"];
                        return ' title= ' + value;
                    }
                },
                {
                    name: 'StudentsName', index: 'StudentsName', width: 90, formatter: function (cellvalue, options, rowObject) {
                        var withdrawalDate = rowObject["IsWithdrawal"];
                        if (withdrawalDate) {
                            return "<span style='color: red;'>" + cellvalue + "</span>";
                        }
                        return cellvalue;
                    }, cellattr: function (rowId, cellValue, rawObject, cm, rdata) {
                        var value = rawObject["DateCreated"];
                        return ' title= ' + value;
                    }
                },
                { name: 'IsWithdrawal', index: 'IsWithdrawal', width: 100, search: true, hidden: true },
                { name: 'FamilyEmail', index: 'FamilyEmail', width: 180, hidden: true },
                { name: 'SponsorTeacherEmail', index: 'SponsorTeacherEmail', width: 180, hidden: true },
                {
                    name: 'VendorName', index: 'VendorName', width: 110, cellattr: function (rowId, cellValue, rawObject, cm, rdata) {
                        var value = rawObject["DateCreated"];
                        return ' title= ' + value;
                    }
                },
                { name: 'ItemNumber', index: 'ItemNumber', width: 40},
				{
				    name: 'UserRequest', index: 'UserRequest', width: 100, cellattr: function (rowId, cellValue, rawObject, cm, rdata) {
				        return ' title=' + rawObject["DateRequest"];
				    }, hidden: true
				},
                { name: 'DateRequest', index: 'DateRequest', width: 100, hidden: true },
                { name: 'DateSponsorSignature', index: 'DateSponsorSignature', width: 100, hidden: true },
                { name: 'DateGuardianSignature', index: 'DateGuardianSignature', width: 100, hidden: true },
                {
                    name: 'SponsorSignature', index: 'SponsorSignature', width: 60, stype: "select", formatter: function (cellvalue, options, rowObject) {
                        var sponsorType = "";
                        var guardianType = "";
                        if (cellvalue == "Sign") {
                            sponsorType = "S";
                        } else if (cellvalue == "Not signed") {
                            sponsorType = "NS";
                        } else if (cellvalue == "Rejected") {
                            sponsorType = "R";
                        } else {
                            sponsorType = "MA";
                        }
                        if (rowObject["GuardianSignature"] == "Sign") {
                            guardianType = "S";
                        } else if (rowObject["GuardianSignature"] == "Not signed") {
                            guardianType = "NS";
                        } else if (rowObject["GuardianSignature"] == "Rejected") {
                            guardianType = "R";
                        } else {
                            guardianType = "MA";
                        }
                        return sponsorType + " / " + guardianType;
                    }, cellattr: function (rowId, cellValue, rawObject, cm, rdata) {
                        var value = rawObject["DateSponsorSignature"] + "--" + rawObject["DateGuardianSignature"];
                        return ' title= ' + value;
                    }
                },
                {
                    name: 'GuardianSignature', index: 'GuardianSignature', width: 80, stype: "select", searchoptions: { value: ":All;0:Not signed;1:Signed" }, hidden: true
                },
                { name: 'Budget', index: 'Budget', width: 45, search: false, formatter: 'currency', formatoptions: { prefix: '$'} },
                { name: 'Balance', index: 'Balance', width: 50, search: false, formatter: 'currency', formatoptions: { prefix: '$' } },
                { name: 'IsClosed', index: 'IsClosed', width: 70, formatter: 'checkbox', stype: "select", searchoptions: { value: ":All;1:True;0:False" }, editable: true, edittype: "checkbox", editoptions: { value: "true:false" } },
                { name: 'GoodOrServiceApprovedText', index: 'GoodOrServiceApprovedText', width: 70, stype: "select", searchoptions: { value: ":All;0:pend;1:appr;2:rejc" } },
                { name: 'CommentsRejectReason', index: 'CommentsRejectReason', width: 80, search: false, editable: true},
                {
                    name: 'email', index: 'email', width: 45, fixed: true, sortable: false, resizable: false, search: false, formatter: function (cellvalue, options, rowObject) {
                        var href = "mailto:" + rowObject["FamilyEmail"] + "?cc=" + rowObject["SponsorTeacherEmail"] + "&subject=Request for missing information";
                        var email = '<a href="' + href + '" class="icon-unset">Email Us</a>';
                        return email;
                    }
                },
                {
                    name: 'Semester', index: 'Semester', width: 70, search: false, formatter: function (cellvalue, options, rowObject) {
                        if (cellvalue == "1") {
                            return "Sem1";
                        } else if (cellvalue == "2") {
                            return "Sem2";
                        } else {
                            return "GS";
                        }
                    }
                },
				{ name: 'act', index: 'act', width: 145, fixed: true, sortable: false, resizable: false, search: false }
            ],
            subGrid: true,
            subGridOptions: { "plusicon": "icon-collapse blue icon-unset", "minusicon": "icon-expand blue icon-unset" },
            subGridRowExpanded: function (subgrid_id, row_id) {
                var lastselSubGrid;
                var subgrid_table_id, pager_id;
                subgrid_table_id = subgrid_id + "_t";
                pager_id = "p_" + subgrid_table_id;
                $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
                jQuery("#" + subgrid_table_id).jqGrid({
                    url: "/GoodAndServiceApproval/_TableBalanceForSubGrid?goodServiceId=" + row_id,
                    editurl: "/GoodAndServiceApproval/EditSubGridRow",
                    datatype: "json",
                    mtype: "POST",
                    jsonReader: {
                        repeatitems: false,
                        id: "GoodServiceBalanceId"
                    },
                    colNames: ['GoodServiceId', 'GoodServiceBalanceId', 'PO', 'Invoice', 'Check', 'Check Date', 'Payee', 'Receipt Date', 'Description', 'Unit Price', 'QTY', 'Shipping', 'Total', 'Actions'],
                    colModel: [
                      { name: "GoodServiceId", index: "GoodServiceId", hidden: true, editable: true },
                      { name: "GoodServiceBalanceId", index: "GoodServiceBalanceId", key: true, hidden: true },
                      { name: "PO", index: "PO", align: "right", editable: true },
                      { name: "Invoice", index: "Invoice", align: "right", editable: true },
                      { name: "Check", index: "Check", align: "right", sortable: false, editable: true },
                      {
                          name: "CheckDate", index: "CheckDate", align: "right", sortable: false, editable: true, formatter: 'date', formatoptions: { newformat: 'm/d/Y' },
                          editoptions: {
                                size: 10,
                                dataInit: function (elem) {
                                    $(elem).datepicker({ dateFormat: 'mm/dd/yyyy' });
                                }   
                          }
                      },
                      { name: "Payee", index: "Payee", align: "right", sortable: false, editable: true },
                      {
                          name: "ReceiptDate", index: "ReceiptDate", align: "right", sortable: false, editable: true, formatter: 'date', formatoptions: { newformat: 'm/d/Y' },
                          editoptions: {
                              size: 10,
                              dataInit: function (el) {
                                  $(el).datepicker({ dateFormat: 'mm/dd/yyyy' });
                              }
                          }
                      },
                      { name: "Description", index: "Description", align: "right", sortable: false, editable: true },
                      { name: "UnitPrice", index: "UnitPrice", align: "right", sortable: false, editable: true, editrules: { number: true } },
                      { name: "QTY", index: "QTY", align: "right", sortable: false, editable: true, editrules: { number: true } },
                      { name: "Shipping", index: "Shipping", align: "right", sortable: false, editable: true, editrules: { number: true } },
                      { name: "Total", index: "Total", align: "right", sortable: false },
                      { name: 'act', index: 'act', width: 140, fixed: true, sortable: false, resize: false, search: false }
                    ],
                    height: 'auto',
                    autowidth: true,
                    rowNum: 20,
                    pager: pager_id,
                    sortname: 'GoodServiceId',
                    sortorder: "asc",
                    rowButtons: [
                        { title: "Delete", rowClass: "delReceipt", rowIcon: "ui-icon icon-trash red" },
                        { title: "Save", rowClass: "saveReceipt", rowIcon: "ui-icon icon-save blue" }
                    ],
                    gridComplete: function () {
                        var grid = jQuery("#" + subgrid_table_id);
                        var ids = grid.jqGrid('getDataIDs');
                        for (var i = 0; i < ids.length; i++) {
                            var cl = ids[i];
                            var rowButtons = "";
                            var rowButtonsConfigs = this.p.rowButtons;
                            if (rowButtonsConfigs != null) {
                                $.each(this.p.rowButtons, function (indx, value) {
                                    //if (value.rowClass != null && value.rowClass != undefined) {
                                    if (value != null) {
                                        var text = value.text != undefined && value.text != null ? value.text : '';
                                        rowButtons += '<td title="' + value.title + '"><div rowid="' + cl + '" class="ui-pg-div ' + value.rowClass + '"><span class="ui-icon ' + value.rowIcon + '">' + text + '</span></div></td>';
                                    }
                                });
                            }
                            var table = '<table class="gridRowActions"><tbody><tr>' + rowButtons + '</tr></tbody></table>';
                            grid.jqGrid('setRowData', ids[i], { act: table });
                        }
                    },
                    beforeSelectRow: function (rowid, e) {
                        grid.setSelection(rowid, true);
                        return false;
                    },
                    onSelectRow: function (id) {
                        if (id && id !== lastselSubGrid) {
                            jQuery("#" + subgrid_table_id).jqGrid('restoreRow', lastselSubGrid);
                            jQuery("#" + subgrid_table_id).jqGrid('editRow', id, true, '', '','','',
                                function () {
                                    fpcs.fpcsGoodService.reloadGrid();
                                    setTimeout(function () { $("#gridTable").jqGrid('expandSubGridRow', row_id) }, 500);
                                });
                            lastselSubGrid = id;
                        }
                    }
                });

                jQuery("#" + subgrid_table_id).jqGrid('navGrid', "#" + pager_id, { edit: false, add: false, del: false, refresh: false, search: false });

                if (fpcs.getIsAdmin()) {
                    var addEntityFuncTitle = "Add new entity"
                    var grid = jQuery("#" + subgrid_table_id).jqGrid('navGrid', "#" + pager_id);
                    grid.jqGrid('navButtonAdd', "#" + pager_id, {
                        caption: "",
                        title: addEntityFuncTitle != undefined ? addEntityFuncTitle : "Add new entity",
                        buttonicon: "icon-plus-sign purple",
                        onClickButton: function () {
                            emptyItem = [{ GoodServiceId: row_id }];
                            $("#" + subgrid_table_id).jqGrid('addRowData', 0, emptyItem);
                            $("#" + subgrid_table_id).editRow(0, true);
                        },
                        position: "first"
                    });
                };

                $(document).off("click", ".delReceipt");
                $(document).on("click", ".delReceipt", function (e) {
                    var id = $(this).attr("rowid");
                    var url = "/GoodAndServiceApproval/DeleteSubGridRow/" + id;
                    fpcs.executeServiceWithConfirm(url, null, function () {
                        jQuery("#" + subgrid_table_id).trigger("reloadGrid");
                        fpcs.fpcsGoodService.reloadGrid();
                        setTimeout(function () { $("#gridTable").jqGrid('expandSubGridRow', row_id) }, 600);
                    });
                });

                $(document).off("click", ".saveReceipt");
                $(document).on("click", ".saveReceipt", function (e) {
                    var id = $(this).attr("rowid");
                    var params = {
                        GoodServiceId: row_id,
                        GoodServiceBalanceId: $("#" + id).find('td').eq(1).text(),
                        PO: $("#" + id + "_PO").val(),
                        Invoice: $("#" + id + "_Invoice").val(),
                        Check: $("#" + id + "_Check").val(),
                        CheckDate: $("#" + id + "_CheckDate").val(),
                        Payee: $("#" + id + "_Payee").val(),
                        ReceiptDate: $("#" + id + "_ReceiptDate").val(),
                        Description: $("#" + id + "_Description").val(),
                        UnitPrice: $("#" + id + "_UnitPrice").val(),
                        QTY: $("#" + id + "_QTY").val(),
                        Shipping: $("#" + id + "_Shipping").val(),
                        Total: $("#" + id + "_Total").val()
                    };
                    fpcs.sendForm3('/GoodAndServiceApproval/EditSubGridRow', params, function (data, textStatus) {
                        if (typeof data == "object" && data.ErrorCode == 200) {
                            jQuery("#" + subgrid_table_id).trigger("reloadGrid");
                            fpcs.fpcsGoodService.reloadGrid();
                            setTimeout(function () { $("#gridTable").jqGrid('expandSubGridRow', row_id) }, 800);
                        }
                        else if (typeof data == "object" && data.ErrorCode == 500) {
                            alert(data.Message);
                        }
                        else if (typeof data == "object" && data.ErrorCode == 800) {
                            alert(data.Message);
                        }
                        else if (typeof data == "object" && data.ErrorCode == 900) {
                            alert(data.Message);
                        }
                    });
                });
            },
            onSelectRow: function (id) {
                if (id && id !== lastsel) {
                    jQuery('#gridTable').jqGrid('restoreRow', lastsel);
                    jQuery('#gridTable').jqGrid('editRow', id, true);
                    lastsel = id;
                }
            },
            rowButtons: [     
                { title: "FPCS Course", rowClass: "gridRowFPCSCourse", rowIcon: "small-font", text: "C", typeButton: "link" },
                { title: "Student Packet Manager", rowClass: "gridRowStudentPacket", rowIcon: "small-font", text: "P", typeButton: "link" },
                { title: "ILP", rowClass: "gridRowILP", rowIcon: "small-font", text: "I", typeButton: "link" },
                { title: "Print Reimbursement", rowClass: "gridRowPrintReimbursement", rowIcon: "small-font-reimb", text: "Reimb", typeButton: "link", reimbReq: true },
                { title: "Print Requisition", rowClass: "gridRowPrintRequisition", rowIcon: "small-font-req", text: "Req", typeButton: "link", reimbReq: true },
                { title: "Good/Service", rowClass: "gridRowGoodService", rowIcon: "small-font", text: "GS", typeButton: "link" }
                
            ]
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("GoodAndServiceApproval");
        fpcs.jqGrid.initNavButtons(null, null);
        fpcs.jqGrid.initNavPrintButton(fpcs.fpcsGoodService.initPrint);
        fpcs.jqGrid.initNavPrintButton2(fpcs.fpcsGoodService.initPrint2, 'Print per vendor', 'Print per vendor');

        $('td[title="Print per vendor"]').parent().append(
            '<td class="ui-pg-button ui-corner-all">' +
                '<div class="ui-pg-div" style="padding-left:10px">' +
                    '<select id="multiActionGrid">' +
                        '<option value="">Select action</option>' +
                        '<option value="1">Approve</option>' +
                        '<option value="2">Pending</option>' +
                        '<option value="3">Reject</option>' +
                        '<option value="4">Close</option>' +
                    '</select>' +
            '</td>'
        );

        fpcs.fpcsGoodService.multiActionGrid();

        fpcs.fpcsGoodService.initEditDialog();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("GoodAndServiceApproval");
        });

        if (fpcs.getIsTeacher() || fpcs.getIsAdmin()) {
            $("#gridRowSendEmail").show();
        }
        else {
            $("#gridRowSendEmail").hide();
        }
    },

    multiActionGrid: function() {
        $("#multiActionGrid").off();
        $("#multiActionGrid").on('change', function () {
            var typeAction = $("#multiActionGrid option:selected").val();
            if (typeAction == '' || typeAction == null) {
                return;
            }

            var params = jQuery("#gridTable").jqGrid('getGridParam', 'selarrrow');
            if (params.length == 0) {
                jAlert("You must choose rows", "Information");
                return;
            }

            fpcs.executeService('/GoodAndServiceApproval/DoMultiAction/', { paramsIds: JSON.stringify(params), action: typeAction }, function (data, textStatus) {
                fpcs.fpcsGoodService.reloadGrid();
            });
        });
    },

    initPrint: function () {
        var params = jQuery("#gridTable").jqGrid('getGridParam', 'selarrrow');

        if (params.length == 0) {
            jAlert("You must choose rows", "Information");
            return;
        }
        
        fpcs.getPartialThroughPost('/GoodAndServiceApproval/_Print/', { paramsIds: JSON.stringify(params) }, function (data, textStatus) {
            fpcs.showDialog("Print Form", data);
        });
    },

    initPrint2: function () {
        fpcs.getPartialThroughPost('/GoodAndServiceApproval/_PrintVendor/', { }, function (data, textStatus) {
            fpcs.showDialog("Print Form", data);
        });
    },

    initPrint3: function (studentPacketId) {
        fpcs.getPartialThroughPost('/StudentPacket2/_PrintReimbursementGeneralExpenses/', { id: studentPacketId }, function (data, textStatus) {
            fpcs.showDialog("Print Form", data);
        });
    },

    initEditDialog: function () {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/GoodAndServiceApproval/_PreEdit/' + id, function (data, textStatus) {
                fpcs.showDialog("Edit Good or Service Approval", data);

                $(document).off("click", ".editSend");
                $(document).on("click", ".editSend", function (e) {
                    e.preventDefault();
                    fpcs.sendForm("editForm", function (data, textStatus) {
                        if (typeof data == "object" && data.ErrorCode == 200) {
                            fpcs.fpcsGoodService.reloadGrid();
                            fpcs.closeDialog();
                        }
                        else {
                            fpcs.showDialog("Edit Good or Service Approval", data);
                        }
                    });
                });
            });
        });

        $(document).off("click", ".gridRowDetails");
        $(document).on("click", ".gridRowDetails", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/GoodAndServiceApproval/_PreDetail/' + id, function (data, textStatus) {
                fpcs.showDialog("Details Good or Service Approval", data);
            });
        });

        $(document).off("click", ".gridRowStudentPacket");
        $(document).on("click", ".gridRowStudentPacket", function (e) {
            var id = $(this).attr("rowid");
            window.open("/GoodAndServiceApproval/StudentPacket/" + id);
        });

        $(document).off("click", ".gridRowFPCSCourse");
        $(document).on("click", ".gridRowFPCSCourse", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/GoodAndServiceApproval/FPCSCourse/' + id, function (data, textStatus) {
                fpcs.showDialog("FPCS Course", data);
                fpcs.fpcsCourse.initTeacherGuardianOpen();

                $(document).off("click", ".editFPCSCourseSend");
                $(document).on("click", ".editFPCSCourseSend", function (e) {
                    e.preventDefault();

                    var that = this;
                    $(that).attr("disabled", true);
                    fpcs.sendForm("editFPCSCourseForm", function (data, textStatus) {
                        $(that).attr("disabled", false);
                        if (typeof data == "object" && data.ErrorCode == 200) {
                            fpcs.fpcsCourse.reloadGrid();
                            fpcs.closeDialog();
                        }
                        else {
                            fpcs.showDialog("Edit FPCS Course", data);
                        }
                    });
                });
            });
        });

        $(document).off("click", ".gridRowILP");
        $(document).on("click", ".gridRowILP", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/GoodAndServiceApproval/ILP/' + id, function (data, textStatus) {
                fpcs.showDialog("ILP", data);
            });
        });

        $(document).off("click", ".gridRowGoodService");
        $(document).on("click", ".gridRowGoodService", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/GoodAndServiceApproval/GoodService/' + id, function (data, textStatus) {
                fpcs.showDialog("Good/Service", data);
                fpcs.goodService.initUniversalSaveDialogApproval();
            });
        });

        $(document).off("click", ".gridRowPrintReimbursement");
        $(document).on("click", ".gridRowPrintReimbursement", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/GoodAndServiceApproval/_PrintReimbursement/' + id, function (data, textStatus) {
                fpcs.showDialog("Print Reimbursement", data);
            });
        });

        $(document).off("click", ".gridRowPrintRequisition");
        $(document).on("click", ".gridRowPrintRequisition", function (e) {
            var params = [];
            var id = $(this).attr("rowid");
            params.push(id);

            fpcs.getPartialThroughPost('/GoodAndServiceApproval/_Print/', { paramsIds: JSON.stringify(params) }, function (data, textStatus) {
                fpcs.showDialog("Print Requisition", data);
            });
        });
    },

    initDetailsPage: function () {
        $(document).off("click", ".gridRowEditGoodAndServiceBalance");
        $(document).on("click", ".gridRowEditGoodAndServiceBalance", function (e) {
            var id = $(this).attr("rowid");
            var goodServiceId = $("#goodServiceId").val();
            fpcs.fpcsGoodService.showEditPage(id, goodServiceId);
        });

        $(document).off("click", "#addBalanceDialog");
        $(document).on("click", "#addBalanceDialog", function (e) {
            var goodServiceId = $("#goodServiceId").val();
            fpcs.fpcsGoodService.showEditPage(0, goodServiceId);
        });

        $(document).off("click", ".gridRowDeleteGoodAndServiceBalance");
        $(document).on("click", ".gridRowDeleteGoodAndServiceBalance", function (e) {
            var id = $(this).attr("rowid");
            var url = "/GoodAndServiceApproval/Delete/" + id;
            fpcs.executeService(url, null, function () {
                fpcs.fpcsGoodService.reloadBalanceGrid();
                fpcs.fpcsGoodService.reloadGrid();
                $('#formGoodAndService').html('');
                $('#editBalanceForm').html('');
            });
        });

        if ($("#hdnGoodOrService").val() != null && $("#hdnGoodOrService").val() != undefined) {
            // обход ошибки "child actions are not allowed to perform redirect actions"
            fpcs.getPartial('/GoodAndService/ChoosePartialForm?goodOrService=' + $("#hdnGoodOrService").val() +
                                                               '&requisitionOrReimbursement=' + $("#hdnRequisitionOrReimbursement").val() +
                                                               '&typeRequisitionReimbursement=' + $("#hdnTypeRequisitionReimbursement").val() +
                                                               '&studentPacketCourseId=' + $("#hdnStudentPacketCourseId").val() +
                                                               '&vendor=' + $("#hdnVendor").val() +
                                                               '&isReadOnly=false' +
                                                               '&id=' + $("#goodServiceId").val() +
                                                               '&courseId=0',
            function (data, textStatus) {
                fpcs.showInternalDialog("#goodServiceTab", data);
                fpcs.fpcsGoodService.initCreateGoodServiceTab();
            });
        }
    },

    initCreateGoodServiceTab : function() {
        $(document).off("click", "#goodServiceTab .createGoodService");
        $(document).on("click", "#goodServiceTab .createGoodService", function (e) {
            e.preventDefault();
            fpcs.sendForm2("#goodServiceTab #createGoodOrServiceForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.closeDialog();
                    fpcs.fpcsGoodService.reloadGrid();
                }
                else {
                    $("#goodServiceTab").html(data);
                }
            });
        });

        $(document).off("click", "#goodServiceTab .cancelGoodService");
        $(document).on("click", "#goodServiceTab .cancelGoodService", function (e) {
            fpcs.closeDialog();
        });

        $(document).off("change", "#goodServiceTab #NumberOfUnits");
        $(document).on("change", "#goodServiceTab #NumberOfUnits", function (e) {
            var numberOfUnits = $("#goodServiceTab #NumberOfUnits").val() * 1;
            var unitPrice = $("#goodServiceTab #UnitPrice").val() * 1;
            var shippingHandlingFees = $("#goodServiceTab #ShippingHandlingFees").val() * 1;

            if (isNaN(numberOfUnits)) { numberOfUnits = 0; }
            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(shippingHandlingFees)) { shippingHandlingFees = 0; }

            $("#goodServiceTab #Total").val(numberOfUnits * unitPrice + shippingHandlingFees);
        });

        $(document).off("change", "#goodServiceTab #UnitPrice");
        $(document).on("change", "#goodServiceTab #UnitPrice", function (e) {
            var numberOfUnits = $("#goodServiceTab #NumberOfUnits").val() * 1;
            var unitPrice = $("#goodServiceTab #UnitPrice").val() * 1;
            var shippingHandlingFees = $("#goodServiceTab #ShippingHandlingFees").val() * 1;

            if (isNaN(numberOfUnits)) { numberOfUnits = 0; }
            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(shippingHandlingFees)) { shippingHandlingFees = 0; }

            $("#goodServiceTab #Total").val(numberOfUnits * unitPrice + shippingHandlingFees);
        });

        $(document).off("change", "#goodServiceTab #ShippingHandlingFees");
        $(document).on("change", "#goodServiceTab #ShippingHandlingFees", function (e) {
            var numberOfUnits = $("#goodServiceTab #NumberOfUnits").val() * 1;
            var unitPrice = $("#goodServiceTab #UnitPrice").val() * 1;
            var shippingHandlingFees = $("#goodServiceTab #ShippingHandlingFees").val() * 1;

            if (isNaN(numberOfUnits)) { numberOfUnits = 0; }
            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(shippingHandlingFees)) { shippingHandlingFees = 0; }

            $("#goodServiceTab #Total").val(numberOfUnits * unitPrice + shippingHandlingFees);
        });

        $(document).off("change", "#goodServiceTab #NumberOfSemesters");
        $(document).on("change", "#goodServiceTab #NumberOfSemesters", function (e) {
            var numberOfSemesters = $("#goodServiceTab #NumberOfSemesters").val() * 1;
            var costPerSemester = $("#goodServiceTab #CostPerSemester").val() * 1;

            if (isNaN(numberOfSemesters)) { numberOfSemesters = 0; }
            if (isNaN(costPerSemester)) { costPerSemester = 0; }

            $("#goodServiceTab #Total").val(numberOfSemesters * costPerSemester);
        });

        $(document).off("change", "#goodServiceTab #CostPerSemester");
        $(document).on("change", "#goodServiceTab #CostPerSemester", function (e) {
            var numberOfSemesters = $("#goodServiceTab #NumberOfSemesters").val() * 1;
            var costPerSemester = $("#goodServiceTab #CostPerSemester").val() * 1;

            if (isNaN(numberOfSemesters)) { numberOfSemesters = 0; }
            if (isNaN(costPerSemester)) { costPerSemester = 0; }

            $("#goodServiceTab #Total").val(numberOfSemesters * costPerSemester);
        });
    },

    showEditPage: function (id, goodServiceId) {
        fpcs.getPartial('/GoodAndServiceApproval/_EditBalance?id=' + id + "&goodServiceId=" + goodServiceId, function (data, textStatus) {
            fpcs.showInternalDialog("#formBalance", data);
        });
    },

    initCreateEditDialogs: function () {
        fpcs.initDatePicker();

        $(document).off("change", "#UnitPrice");
        $(document).on("change", "#UnitPrice", function (e) {
            var unitPrice = $("#UnitPrice").val() * 1;
            var qty = $("#QTY").val() * 1;
            var shipping = $("#Shipping").val() * 1;

            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(qty)) { qty = 0; }
            if (isNaN(shipping)) { shipping = 0; }

            $("#Total").val(unitPrice * qty + shipping);
        });

        $(document).off("change", "#QTY");
        $(document).on("change", "#QTY", function (e) {
            var unitPrice = $("#UnitPrice").val() * 1;
            var qty = $("#QTY").val() * 1;
            var shipping = $("#Shipping").val() * 1;

            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(qty)) { qty = 0; }
            if (isNaN(shipping)) { shipping = 0; }

            $("#Total").val(unitPrice * qty + shipping);
        });

        $(document).off("change", "#Shipping");
        $(document).on("change", "#Shipping", function (e) {
            var unitPrice = $("#UnitPrice").val() * 1;
            var qty = $("#QTY").val() * 1;
            var shipping = $("#Shipping").val() * 1;

            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(qty)) { qty = 0; }
            if (isNaN(shipping)) { shipping = 0; }

            $("#Total").val(unitPrice * qty + shipping);
        });

        $(document).off("click", ".editBalanceSend");
        $(document).on("click", ".editBalanceSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editBalanceForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.fpcsGoodService.reloadBalanceGrid();
                    fpcs.fpcsGoodService.reloadGrid();
                    $("#formBalance").html('');
                }
                else {
                    fpcs.showDialog("Edit Good or Service Approval", data);
                }
            });
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid");
    },

    reloadBalanceGrid: function() {
        fpcs.getPartial('/GoodAndServiceApproval/_TableBalance?goodServiceId=' + $("#goodServiceId").val(),
        function (data, textStatus) {
            fpcs.showInternalDialog("#tableGoodAndServiceBalance", data);
            fpcs.fpcsGoodService.initDetailsPage();
        });
    }
}