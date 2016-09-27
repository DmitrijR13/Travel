fpcs.signedPacket = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "SignedPacket",
            url: "/SignedPacket/_Index",
            sortname: 'StudentName',
            rowNum: 100000,
            showDetailsButton: false,
            showEditButton: false,
            showDeleteButton: false,
            jsonReader: {
                repeatitems: false,
                id: "StudentGuid"
            },
            colNames: ['ID', 'Student Name', 'IsWithdrawal', 'Grade', 'Home Phone', 'Email', 'Date Sponsor Signature', 'Date Guardian Signature', 'Actions'],
            colModel: [
				{ name: 'StudentGuid', index: 'StudentGuid', key: true, hidden: true, search: false },
                {
                    name: 'StudentName', index: 'StudentName', width: 100, search: true, formatter: function (cellvalue, options, rowObject) {
                        var withdrawalDate = rowObject["IsWithdrawal"];
                        if (withdrawalDate) {
                            return "<span style='color: red;'>" + cellvalue + "</span>";
                        }
                        return cellvalue;
                    }
                },
                { name: 'IsWithdrawal', index: 'IsWithdrawal', width: 100, search: true, hidden: true },
                { name: 'Grade', index: 'Grade', width: 100, search: false },
                { name: 'HomePhone', index: 'HomePhone', width: 100, search: false },
                { name: 'EmailFamily', index: 'EmailFamily', width: 100, search: false },
                { name: 'DateSponsorSignature', index: 'DateSponsorSignature', width: 100, search: false },
                { name: 'DateGuardianSignature', index: 'DateGuardianSignature', width: 100, search: false },
				{ name: 'act', index: 'act', width: 80, fixed: true, sortable: false, resize: false, search: false }
            ],
            rowButtons: [{ title: "Student Packet Manager", rowClass: "gridRowStudentPacket", rowIcon: "icon-suitcase green" }]
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("SignedPacket");
        fpcs.jqGrid.initNavButtons(null, null);
        fpcs.jqGrid.initNavPrintButton(fpcs.signedPacket.initPrint);

        $(document).off("click", ".gridRowStudentPacket");

        $(document).on("click", ".gridRowStudentPacket", function (e) {
            var id = $(this).attr("rowid");
            window.open("/StudentPacket2/Index/" + id);
        });

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("SignedPacket");
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid");
    },
    initPrint: function () {
        var params = jQuery("#gridTable").jqGrid('getGridParam', 'selarrrow');

        if (params.length == 0) {
            jAlert("You must choose rows", "Information");
            return;
        }

        fpcs.getPartialThroughPost('/SignedPacket/_Print/', { paramsIds: JSON.stringify(params) }, function (data, textStatus) {
            fpcs.showDialog("Print Form", data);
        });
    }
}