travel = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "Fiz",
            url: "/Fiz/_Index",
            rowNum: 100000,
            showEditButton: true,
            showDeleteButton: true,
            sortname: 'FIO',
            jsonReader: {
                repeatitems: false,
                id: "PersonId"
            },
            colNames: ['PersonId', 'FIO', 'Phones', 'FieldOfActivity', 'Email', 'WayOfInform', 'DateOfBirth'],
            colModel: [
				{ name: 'PersonId', index: 'PersonId', key: true, hidden: true },
				{
				    name: 'FIO', index: 'FIO', width: 65,
				    sortable: true
				},
                {
                    name: 'Phones', index: 'Phones', width: 65,
                    sortable: false
                },
                {
                    name: 'FieldOfActivity', index: 'FieldOfActivity', width: 70,
                    sortable: false,
                    resizeble: false 
                },
				{
				    name: 'Email', index: 'Email', width: 90
				},
                {
                    name: 'WayOfInform', index: 'WayOfInform', width: 90
                },
                {
                    name: 'DateOfBirth', index: 'DateOfBirth', width: 90
                }
            ],

            ondblClickRow: function (id) {
                $("div.gridRowStudentPacket2[rowid='" + id + "']").trigger('click');
            }
        });

        fpcs.jqGrid.initGridResize();
        //fpcs.jqGrid.initFilterToolbar("Student");

        if (!fpcs.getIsTeacher() && !fpcs.getIsGuardian()) {
            fpcs.jqGrid.initNavButtons("/Fiz/DeleteAll", travel.showCreateDialog, "Добавить нового клиента");
        }
       
        //fpcs.jqGrid.initNavPrintButton(fpcs.student.initPrint);

        fpcs.student.initDetailsDialog();
        fpcs.student.initCreateDialogSend();
        fpcs.student.initEditDialog();
        fpcs.student.initDeleteOneEntity();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("FizPerson");
        });
    },

    //showDetailsDialog: function (id) {
    //    fpcs.getPartial('/Student/_Details/' + id, function (data, textStatus) {
    //        fpcs.showDialog("Student details", data);
    //    });
    //},

    //initDetailsDialog: function () {
    //    $(document).on("click", ".gridRowDetails", function (e) {
    //        var id = $(this).attr("rowid");
    //        fpcs.student.showDetailsDialog(id);
    //    });
    //},

    showCreateDialog: function () {
        fpcs.getPartial('/Fiz/_Create/', function (data, textStatus) {
            fpcs.showDialog("Добавить нового клиента", data);
        });
    },

    initCreateDialogSend: function () {
        $(document).off("click", ".createFizSend");
        $(document).on("click", ".createFizSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createFizForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    travel.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Добавить нового клиента", data);
                }
            });
        });
    },

    showEditDialog: function (id) {
        fpcs.getPartial('/Student/_Edit/' + id, function (data, textStatus) {
            fpcs.showDialog("Edit Student", data);

            if (!fpcs.getIsAdmin()) {
                $("#PercentagePlanningEnroll").prop("readonly", true);
                $("#PercentagePlanningEnroll").prop("disabled", true);
            }

            if (fpcs.getIsGuardian()) {
                $("#FirstName").prop("readonly", true);
                $("#LastName").prop("readonly", true);
                $("#MiddleInitial").prop("readonly", true);
                $("#Grade").prop("readonly", true);
                $("#Grade").prop("disabled", true);
                $("#enrollmentStatus").prop("readonly", true);
                $("#enrollmentStatus").prop("disabled", true);
            }
            else {
                $("#FirstName").prop("readonly", false);
                $("#LastName").prop("readonly", false);
                $("#MiddleInitial").prop("readonly", false);
                $("#Grade").prop("readonly", false);
                $("#Grade").prop("disabled", false);
                $("#enrollmentStatus").prop("readonly", false);
                $("#enrollmentStatus").prop("disabled", false);
            }
        });
    },

    initEditDialog: function () {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            fpcs.student.showEditDialog(id);
        });

        $(document).off("click", ".editStudentSend");
        $(document).on("click", ".editStudentSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editStudentForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.student.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit Student", data);
                }
            });
        });

        $(document).off("click", ".editStudentIEPSend");
        $(document).on("click", ".editStudentIEPSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editStudentIEPForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.student.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit IEP Student", data);
                }
            });
        });

        $(document).off("click", ".editStudentILPPhilosophySend");
        $(document).on("click", ".editStudentILPPhilosophySend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editStudentILPPhilosophyForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.student.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Edit ILP Philosophy Student", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/Fiz/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                fpcs.student.reloadGrid();
            });
        });
    },


    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }

}