emailDetail = {

    initIndexPage: function (emailLetterId) {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            localStorageId: "EmailDetail",
            url: "/Email/PersonDetail?emailLetterId=" + emailLetterId,
            rowNum: 100000,
            showEditButton: false,
            showDeleteButton: false,
            sortname: 'FIO',
            jsonReader: {
                repeatitems: false,
                id: "EmailLetterId"
            },
            colNames: ['PersonId', 'ФИО', 'Телефоны', 'Email', 'Действия'],
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
				    name: 'Email', index: 'Email', width: 90
				},
                { name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false }
            ]
        });

        fpcs.jqGrid.initGridResize();
        //fpcs.jqGrid.initFilterToolbar();

        //fpcs.jqGrid.initNavButtons("/Email/DeleteAll", null, "");
        //email.initEmailInfoButton();
       
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.initSendEmail);
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.showSendEmailDialog, "Отправить email");

        //fizPerson.initDetailsDialog();
        //fizPerson.initCreateDialogSend();
        //fizPerson.initEditDialog();
        //fizPerson.initDeleteOneEntity();
        //fizPerson.sendEmail();

        $(window).unload(function () {
            fpcs.jqGrid.saveLocalStorage("EmailDetail");
        });
    },

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }

}