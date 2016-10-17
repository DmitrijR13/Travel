incomingMessageJournal = {

    initIndexPage: function () {
        fpcs.jqGrid.initGrid({
            gridWrapper: ".gridWrapper",
            gridSelector: "#gridTable",
            pagerSelector: "#gridPager",
            //localStorageId: "IncomingMessageJournalGrid",
            url: "/IncomingMessageJournal/_Index",
            rowNum: 100000,
            showEditButton: true,
            showDeleteButton: true,
            sortname: 'Fio',
            jsonReader: {
                repeatitems: false,
                id: "IncomingMessageJournalId"
            },
            colNames: ['IncomingMessageJournalId', 'Дата', 'ФИО', 'Телефон', 'Содержание заявки', 'Принял', 'Ответсвенный',
                'Источник поступления', 'Результат', 'Источник информации о нас', 'Действия'],
            colModel: [
				{ name: 'IncomingMessageJournalId', index: 'IncomingMessageJournalId', key: true, hidden: true },
				{
                    name: 'Date', index: 'Date', width: 65,
                    sortable: true
				},
                {
                    name: 'Fio', index: 'Fio', width: 90
                },
                {
                    name: 'Phones', index: 'Phones', width: 90
                },
                {
                    name: 'RequestContent', index: 'RequestContent', width: 90
                },
                {
                    name: 'AcceptedByWorkerFio', index: 'AcceptedByWorkerFio', width: 90
                },
                {
                    name: 'ResponsibleWorkerFio', index: 'ResponsibleWorkerFio', width: 90
                },
                {
                    name: 'IncomingSource', index: 'IncomingSource', width: 80,
                    stype: "select",
                    searchoptions: {
                        value: ":Все;" + $("#incomingSources").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
                {
                    name: 'Result', index: 'Result', width: 90
                },
                {
                    name: 'SourceInfo', index: 'SourceInfo', width: 80,
                    stype: "select",
                    searchoptions: {
                        value: ":Все;" + $("#sourceInfos").val(),
                        defaultValue: ""
                    },
                    sortable: false
                },
                { name: 'act', index: 'act', width: 90, fixed: true, sortable: false, resize: false, search: false }
            ]
        });



        fpcs.jqGrid.initGridResize();
       //fpcs.jqGrid.initFilterToolbar("IncomingMessageJournal");

        fpcs.jqGrid.initNavButtons("/IncomingMessageJournal/DeleteAll", incomingMessageJournal.showCreateDialog, "Добавить новую заявку");
    //    personEmail.initPersonEmailButton();
       
        //fpcs.jqGrid.initNavSendEmailButton(fizPerson.initSendEmail);
       // fpcs.jqGrid.initNavSendEmailButton(fizPerson.showSendEmailDialog, "Отправить email");

        //fizPerson.initDetailsDialog();
        incomingMessageJournal.initCreateDialogSend();
        incomingMessageJournal.initEditDialog();
        incomingMessageJournal.initDeleteOneEntity();
       // fizPerson.sendEmail();

        $("#personsSelect").chosen({ allow_single_deselect: true, search_contains: true });

        //$(window).unload(function () {
        //    fpcs.jqGrid.saveLocalStorage("IncomingMessageJournal");
        //});
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
        location.href = '/IncomingMessageJournal/_Create/';
    },

    showEditDialog: function (id) {
        location.href = '/IncomingMessageJournal/_Edit/' + id;
    },

    initFamilyPeoples: function () {
        $("#personsSelect").chosen().change(function (arg, opt) {
            var url = "/IncomingMessageJournal/_JournalPersonPartial/";
            incomingMessageJournal.addUserToJournal(this, opt.selected, url, "students-feed");
        });
        incomingMessageJournal.initCreatePersonDialog();
        incomingMessageJournal.initEditPersonDialog();
    },

    addUserToJournal: function (select, optId, url, containerId) {
        fpcs.getPartial(url + optId, function (data, textStatus) {
            if (data.ErrorCode != undefined && data.ErrorCode == 500) {
                fpcs.errorAlert();
                $(select).val('').trigger('chosen:updated');
            }
            else {
                $("#profile-activity-del").remove();
                $("#" + containerId).append(data);
                //$(select).find("option[value='" + optId + "']").hidden;
                $(select).val('').trigger('chosen:updated');
            }
        });
    },

    initCreatePersonDialog: function () {
        $(document).off("click", ".createfizPersonOpen");
        $(document).on("click", ".createFizPersonOpen", function (e) {
            e.preventDefault();
            fizPerson.showCreateDialog();
        });

        $(document).off("click", ".createFizPersonSend");
        $(document).on("click", ".createFizPersonSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createFizPersonForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    incomingMessageJournal.addCreatedPersonToJournal("/IncomingMessageJournal/_JournalPersonPartial/", JSON.parse(data.Obj), "students-feed");
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Create Student", data);
                }
            });
        });
    },

    addCreatedPersonToJournal: function (url, userId, containerId) {
        fpcs.getPartial(url + userId, function (data, textStatus) {
            if (data.ErrorCode != undefined && data.ErrorCode == 500) {
                fpcs.errorAlert();
            }
            else {
                var container = $(data).closest("div.profile-activity");
                var name = container.children("input[id*=FIO]").val();
                var phones = container.children("input[id*=Phones]").val();
                $("#profile-activity-del").remove();
                $("#" + containerId).append(data);
                $(".chosen-select").append("<option value='" + userId + "'>" + name + ', т. ' + phones + "</option>");
                $(".chosen-select").trigger('chosen:updated');
            }
        });
    },

    delUserFromJournal: function (obj) {
        var container = $(obj).closest("div.profile-activity");
        var id = container.children("input[id*=PersonId]").val();
        var name = container.children("input[id*=FIO]").val();

        var select = $(obj).closest("div.widget-box").find(".widget-header h4 select");
        select.prepend("<option value='" + id + "'>" + name + "</option>");
        $(select).trigger('chosen:updated');
        container.remove();
        return false;
    },

    initJouranlCreateEditPages: function () {
        $('textarea[class*=autosize]').autosize({ append: "\n" });
        $(".chosen-select").chosen();
        incomingMessageJournal.initFamilyPeoples();
    },

    initEditPersonDialog: function () {
        $(document).off("click", ".editFizPersonOpen");
        $(document).on("click", ".editFizPersonOpen", function (e) {
            e.preventDefault();
            var id = $(this).attr("rowid");
            fizPerson.showEditDialog(id);
        });

        $(document).off("click", ".editFizPersonSend");
        $(document).on("click", ".editFizPersonSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editFizPersonForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    var obj = JSON.parse(data.Obj);
                    var container = $("input[value=" + obj.PersonId + "]").closest(".profile-activity");
                    container.find("a.user.editFizPersonOpen").text(obj.FIO);
                    if (obj.Phones != null) {
                        var text = "<i class='icon-phone  bigger-110'></i> " + obj.Phones;
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

    initCreateDialogSend: function () {
        $(document).off("click", ".createIncomingMessageJournalSend");
        $(document).on("click", ".createIncomingMessageJournalSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("createIncomingMessageJournalForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    incomingMessageJournal.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Добавить новую заявку", data);
                }
            });
        });
    },

    //showSendEmailDialog: function () {
    //    var selRowIds = jQuery('#gridTable').jqGrid('getGridParam', 'selarrrow');
    //    fpcs.getPartial('/Fiz/SendEmail?ids=' + selRowIds, function (data, textStatus) {
    //        fpcs.showDialog("Отправить письма", data);
    //    });
    //},

    initEditDialog: function () {
        $(document).off("click", ".gridRowEdit");
        $(document).on("click", ".gridRowEdit", function (e) {
            var id = $(this).attr("rowid");
            incomingMessageJournal.showEditDialog(id);
        });

        $(document).off("click", ".editIncomingMessageJournalSend");
        $(document).on("click", ".editIncomingMessageJournalSend", function (e) {
            e.preventDefault();
            fpcs.sendForm("editIncomingMessageJournalForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    incomingMessageJournal.reloadGrid();
                    fpcs.closeDialog();
                }
                else {
                    fpcs.showDialog("Изменить данные о заявке", data);
                }
            });
        });
    },

    initDeleteOneEntity: function () {
        $(document).off("click", ".gridRowDelete");
        $(document).on("click", ".gridRowDelete", function (e) {
            var id = $(this).attr("rowid");
            var url = "/IncomingMessageJournal/Delete/" + id;
            fpcs.executeServiceWithConfirm(url, null, function () {
                incomingMessageJournal.reloadGrid();
            });
        });
    },

    //sendEmail: function () {
    //    $(document).off("click", ".emailSend");
    //    $(document).on("click", ".emailSend", function (e) {
    //        e.preventDefault();
    //        fpcs.sendForm("sendEmailForm", function (data, textStatus) {
    //            if (typeof data == "object" && data.ErrorCode == 200) {
    //                fizPerson.reloadGrid();
    //                fpcs.closeDialog();
    //            }
    //            else {
    //                fpcs.showDialog("Отправить письма", data);
    //            }
    //        });
    //    });
    //},

    reloadGrid: function () {
        jQuery("#gridTable").trigger("reloadGrid")
    }

}