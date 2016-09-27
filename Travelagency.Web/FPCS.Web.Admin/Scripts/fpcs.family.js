fpcs.family = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "Family",
            showDetailsButton: false,
            showDeleteButton: !fpcs.getIsTeacher(),
            url: "/Family/_Index",
            sortname: 'Name',
            jsonReader: {
                repeatitems: false,
                id: "FamilyId"
            },
            colNames: ['ID', 'Names', 'Email', 'Telephone', 'Actions'],
            colModel: [
				{ name: 'FamilyId', index: 'FamilyId', key: true, hidden: true },
                { name: 'FirstNames', index: 'Name', sortable: false, width: 200 },
				{ name: 'Email', index: 'Email', width: 60 },
                { name: 'Telephone', index: 'Telephone', width: 60 },
				{ name: 'act', index: 'act', width: 120, fixed: true, sortable: false, resize: false, search: false },
            ],
            rowButtons: [
                { title: "Print reimbursement", rowClass: "gridRowPrintReimbursement", rowIcon: "icon-print green" },
                { title: "Monthly contact log", rowClass: "gridRowMonthlyContactLog", rowIcon: "icon-calendar purple" }
            ]
        });
        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("Family");

        if (!fpcs.getIsTeacher()) {
            fpcs.jqGrid.initNavButtons("/Family/DeleteAll", fpcs.family.showCreatePage, "Add new family");
        }
        else {
            fpcs.jqGrid.initNavButtons(null, null);
        }

        fpcs.family.initMonthlyContactLogPage();
        fpcs.family.initShowEditPage();
        fpcs.family.initDeleteOneEntity();
        fpcs.family.initPrintReimbursement();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("Family");
        });

        $("#ddlFamily").chosen({ allow_single_deselect: true, width: '200px' });
        $("#ddlFamily").off('change');
        $("#ddlFamily").on('change', function () {
            $("#gridTable").setGridParam({ postData: { familyId: $("#ddlFamily option:selected").val() } });
            $("#gridTable").trigger("reloadGrid");
        });
    },

    showCreatePage: function () {
        location.href = "/Family/Create";
    },

    initMonthlyContactLogPage: function (id) {
        $(document).off("click", ".gridRowMonthlyContactLog");
        $(document).on("click", ".gridRowMonthlyContactLog", function (e) {
            var id = $(this).attr("rowid");
            window.open("/Family/MonthlyContactLog/" + id);
        });
    },

    initShowEditPage: function (id) {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            if (fpcs.getIsTeacher()) {
                location.href = "/Family/EditForTeacher/" + id;
            }
            else {
                location.href = "/Family/Edit/" + id;
            }
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/Family/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fpcs.family.reloadGrid();
            });
        });
    },

    initPrintReimbursement: function () {
        $(document).off("click", ".gridRowPrintReimbursement");
        $(document).on("click", ".gridRowPrintReimbursement", function (e) {
            var id = $(this).attr("rowid");
            fpcs.getPartial('/Family/_PrintReimbursement/' + id, function (data, textStatus) {
                fpcs.showDialog("Print form", data);
            });
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    },


    initFamilyCreateEditPages: function () {
        $('textarea[class*=autosize]').autosize({ append: "\n" });
        $(".chosen-select").chosen();
        fpcs.family.initFamilyPeoples();
    },

    initFamilyPeoples: function () {
        $("#guardiansSelect").chosen().change(function (arg, opt) {
            var url = "/Family/_FamilyGuardianPartial/";
            fpcs.family.addUserToFamily(this, opt.selected, url, "guardians-feed");
        });
        $("#studentsSelect").chosen().change(function (arg, opt) {
            var url = "/Family/_FamilyStudentPartial/";
            fpcs.family.addUserToFamily(this, opt.selected, url, "students-feed");
        });
        fpcs.family.initCreateGuardianDialog();
        fpcs.family.initCreateStudentDialog();
        fpcs.family.initEditGuardianDialog();
        fpcs.family.initEditStudentDialog();
    },

    initCreateGuardianDialog: function () {
        $(document).off("click", ".createGuardianOpen");
        $(document).on("click", ".createGuardianOpen", function (e) {
            e.preventDefault();
            fpcs.guardian.showCreateDialog();
        });

        $(document).off("click", ".createGuardianSend");
        $(document).on("click", ".createGuardianSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createGuardianForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.family.addCreatedUserToFamily("/Family/_FamilyGuardianPartial/", JSON.parse(data.Obj), "guardians-feed");
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Create Guardian", data);
                }
            });
        });

        $(document).off("click", ".cancelGuardianSend");
        $(document).on("click", ".cancelGuardianSend", function (e) {
            e.preventDefault();
            fpcs.closeDialog();
        });
    },
    
    initCreateStudentDialog: function () {
        $(document).off("click", ".createStudentOpen");
        $(document).on("click", ".createStudentOpen", function (e) {
            e.preventDefault();
            fpcs.student.showCreateDialog();
        });

        $(document).off("click", ".createStudentSend");
        $(document).on("click", ".createStudentSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createStudentForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.family.addCreatedUserToFamily("/Family/_FamilyStudentPartial/", JSON.parse(data.Obj), "students-feed");
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Create Student", data);
                }
            });
        });
    },

    initEditGuardianDialog: function () {
        $(document).off("click", ".editGuardianOpen");
        $(document).on("click", ".editGuardianOpen", function (e) {
            e.preventDefault();
            var id = $(this).attr("rowid");
            fpcs.guardian.showEditDialog(id);
        });

        $(document).off("click", ".editGuardianSend");
        $(document).on("click", ".editGuardianSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editGuardianForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    var obj = JSON.parse(data.Obj);
                    var container = $("input[value=" + obj.DbUserId + "]").closest(".profile-activity");
                    container.find("a.user.editGuardianOpen").text(obj.FullName);
                    if (obj.Phone != null) {
                        var text = "<i class='icon-phone  bigger-110'></i> " + obj.Phone;
                        container.find("div.time").html(text);
                    }
                    else {
                        container.find("div.time").html("");
                    }
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit Guardian", data);
                }
            });
        });
    },

    initEditStudentDialog: function () {
        $(document).off("click", ".editStudentOpen");
        $(document).on("click", ".editStudentOpen", function (e) {
            e.preventDefault();
            var id = $(this).attr("rowid");
            fpcs.student.showEditDialog(id);
        });

        $(document).off("click", ".editStudentSend");
        $(document).on("click", ".editStudentSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editStudentForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    var obj = JSON.parse(data.Obj);
                    var container = $("input[value=" + obj.DbUserId + "]").closest(".profile-activity");
                    container.find("a.user.editStudentOpen").text(obj.FullName);
                    if (obj.GradYear != null) {
                        var text = "<i class='icon-calendar bigger-110'></i> " + obj.GradYear;
                        container.find("div.time").html(text);
                    }
                    else {
                        container.find("div.time").html("");
                    }
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit Student", data);
                }
            });
        });
    },

    addUserToFamily: function (select, optId, url, containerId) {
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

    addCreatedUserToFamily: function (url, userId, containerId) {
        fpcs.getPartial(url + userId.id, function (data, textStatus) {
            if (data.ErrorCode != undefined && data.ErrorCode == 500) {
                fpcs.errorAlert();
            }
            else {
                $("#" + containerId).append(data);
            }
        });
    },

    delUserFromFamily: function (obj) {
        var container = $(obj).closest("div.profile-activity");
        var id = container.children("input[id*=DbUserId]").val();
        var name = container.children("input[id*=FullName]").val();

        var select = $(obj).closest("div.widget-box").find(".widget-header h4 select");
        select.prepend("<option value='" + id + "'>" + name + "</option>");
        $(select).trigger('chosen:updated');

        container.remove();
        return false;
    },

    printReimbursement: function () {
        var sheets = $(".sheetPrint");
        $.each(sheets, function (indexSheet, elemSheet) {
            var total = $(elemSheet).find(".hidTotalReimbursement").val();

            var items = $(elemSheet).find(".cbSelectedReimbursement:not(:checked)");
            $.each(items, function (index, item) {
                $(item).parent().parent().hide();
                total -= $(item).siblings('input[type=hidden]').val();
            });

            $(elemSheet).find(".totalReimbursement").html("$" + total + "&nbsp;");
            $(elemSheet).find(".instruction").hide();
            $(elemSheet).find(".infoProcedures").hide();
            $(elemSheet).find(".infoCheckPayable").show();

            var itemsCbColumn = $(elemSheet).find(".cbColumn");
            $.each(itemsCbColumn, function (index, item) {
                $(item).hide();
            });
        });

        fpcs.print('print');

        $.each(sheets, function (indexSheet, elemSheet) {
            var total = $(elemSheet).find(".hidTotalReimbursement").val();

            var items = $(elemSheet).find(".cbSelectedReimbursement:not(:checked)");
            $.each(items, function (index, item) {
                $(item).parent().parent().show();
            });

            $(elemSheet).find(".totalReimbursement").html("$" + $(elemSheet).find(".hidTotalReimbursement").val() + "&nbsp;");
            $(elemSheet).find(".instruction").show();
            $(elemSheet).find(".infoCheckPayable").hide();
            $(elemSheet).find(".infoProcedures").hide();

            var itemsCbColumn = $(elemSheet).find(".cbColumn");
            $.each(itemsCbColumn, function (index, item) {
                $(item).show();
            });
        });
    }
}