person = {

    initIndexPage: function (personId) {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "PersonInfo",
            url: "/Person/Detail?personId=" + personId,
            rowNum: 100000,
            showEditButton: false,
            showDeleteButton: false,
            sortname: 'Theme',
            jsonReader: {
                repeatitems: false,
                id: "EmailLetterId"
            },
            colNames: ['EmailLetterId', 'Тема', 'Текст', 'Дата', 'Действия'],
            colModel: [
				{ name: 'EmailLetterId', index: 'EmailLetterId', key: true, hidden: true },
				{
				    name: 'Theme', index: 'Theme', width: 65,
				    sortable: true
				},
                {
                    name: 'Body', index: 'Body', width: 65,
                    sortable: false
                },
                {
                    name: 'CreateDate', index: 'CreateDate', width: 70,
                    sortable: false,
                    resizeble: false 
                },
                { name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false }
            ],
        });

        fpcs.jqGrid.initGridResize();
        fpcs.jqGrid.initFilterToolbar("PersonInfo");

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("FizPerson");
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }

}