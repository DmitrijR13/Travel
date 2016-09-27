fpcs.goodService = {

    initDetailsGoodServiceDialog: function (typeCall) {
        $(document).off("click", ".gridRowEditGoodAndService");
        $(document).on("click", ".gridRowEditGoodAndService", function (e) {
            e.preventDefault();

            var id = $(this).attr("rowid");
            fpcs.goodService.showDetailsGoodServiceDialog(id, typeCall);
        });
    },

    initDeleteGoodService: function (typeCall) {
        $(document).off("click", ".gridRowDeleteGoodAndService");
        $(document).on("click", ".gridRowDeleteGoodAndService", function (e) {
            var id = $(this).attr("rowid");
            var url = "/GoodAndService/Delete/" + id;
            fpcs.executeService(url, null, function (data) {
                fpcs.goodService.reloadGrid(typeCall);
                $('#itemGoodAndService').html('');
                $('#formGoodAndService').html('');

                if (data.Obj != null) {
                    var jsonData = JSON.parse(data.Obj);
                    if (jsonData.Sponsorship != undefined) {
                        var sponsorshipOut = $("#sponsorshipOut").val() * 1;
                        $("#sponsorshipEdit").html("$" + jsonData.Sponsorship.toFixed(2)); // + " out of $" + sponsorshipOut.toFixed(2)
                        $("#spnSponsorshipEdit").html("$" + jsonData.Sponsorship.toFixed(2)); // + " out of $" + sponsorshipOut.toFixed(2)
                    }
                }
            });
        });
    },

    showDetailsGoodServiceDialog: function (id, typeCall) {
        var vendorId = $("#vendorId").val();
        var studentPacketId = $("#studentPacketId").val();
        var studentPacketCourseId = $("#studentPacketCourseId").val();
        var courseId = $("#courseId").val();

        if (studentPacketId == null || studentPacketId == undefined)
            studentPacketId = 0;

        if (studentPacketCourseId == null || studentPacketCourseId == undefined)
            studentPacketCourseId = 0;

        if (courseId == null || courseId == undefined)
            courseId = 0;

        fpcs.getPartial('/GoodAndService/__UniversalGoodService?' +
                            '&studentPacketId=' + studentPacketId +
                            '&studentPacketCourseId=' + studentPacketCourseId +
                            '&courseId=' + courseId +
                            '&goodServiceId=' + id + 
                            '&typeCall=' + typeCall,
        function (data, textStatus) {
            fpcs.showInternalDialog("#itemGoodAndService", data);
            fpcs.goodService.initUniversalSaveDialog();
            $('#itemGoodAndService').attr('style', '');
        });
    },

    initPrintGoodService : function(studentPacketCourseId, fpcsCourseId, studentPacketId)
    {
        $(document).off("click", "#printGoodOrService");
        $(document).on("click", "#printGoodOrService", function (e) {
            e.preventDefault();
            fpcs.getPartial('/GoodAndService/_PrintGoodAndService?studentPacketCourseId=' + studentPacketCourseId + '&courseId=' + fpcsCourseId + '&studentPacketId=' + studentPacketId, function (data, textStatus) {
                fpcs.showDialog("Print Form", data);
            });
        });
    },

    initCreateDialogs: function () {
        $('#itemGoodAndService').attr('style', 'padding-bottom: 150px');

        $('.cgRequisitionOrReimbursement').hide();
        $('.cgTypeRequisitionReimbursement').hide();
        $('.cgVendor').hide();

        if ($('#Vendor_chosen') != null || $('#Vendor_chosen') != undefined) {
            $('.vendor').chosen();
        }

        $("#formGoodAndService").html('');

        $(document).off("change", ".goodsOrServices");
        $(document).on("change", ".goodsOrServices", function (e) {
            e.preventDefault();
            
            $('.vendor').val('').trigger('chosen:updated');

            var val = $(this).val();
            
            if (val != null && val != undefined && val != "") {
                var url = "/GoodAndService/GetValueLookup?goodOrService=" + val + "&requisitionOrReimbursement=" + "&typeRequisitionReimbursement=" + "&vendor=";

                fpcs.executeService(url, null, function (data) {
                    var obj = jQuery.parseJSON(data.Obj);

                    $('.requisitionOrReimbursement').html('');

                    if (obj.length > 0) {
                        for (var i = 0; i < obj.length; i++) {
                            $('.requisitionOrReimbursement').append("<option value='" + obj[i].Value + "'>" + obj[i].Text + "</option>");
                        }

                        $('.cgRequisitionOrReimbursement').show();
                    }
                    else {
                        $('.cgRequisitionOrReimbursement').hide();
                    }


                    $('.cgTypeRequisitionReimbursement').hide();
                    $('.cgVendor').hide();

                    $('.typeRequisitionReimbursement').html('');
                });
            }
            else {
                $('.cgRequisitionOrReimbursement').hide();
                $('.cgTypeRequisitionReimbursement').hide();
                $('.cgVendor').hide();

                $('.requisitionOrReimbursement').html('');
                $('.typeRequisitionReimbursement').html('');
            }

            $('#formGoodAndService').html('');
            $('#itemGoodAndService').attr('style', 'padding-bottom: 150px');
        });

        $(document).off("change", ".requisitionOrReimbursement");
        $(document).on("change", ".requisitionOrReimbursement", function (e) {
            e.preventDefault();

            $('.vendor').val('').trigger('chosen:updated');

            var val1 = $('.goodsOrServices').val();
            var val2 = $(this).val();
            
            if (val2 != null && val2 != undefined && val2 != "") {
                var url = "/GoodAndService/GetValueLookup?goodOrService=" + val1 + "&requisitionOrReimbursement=" + val2 + "&typeRequisitionReimbursement=" + "&vendor=";

                fpcs.executeService(url, null, function (data) {
                    var obj = jQuery.parseJSON(data.Obj);

                    $('.typeRequisitionReimbursement').html('');

                    if (obj.length > 0) {
                        for (var i = 0; i < obj.length; i++) {
                            $('.typeRequisitionReimbursement').append("<option value='" + obj[i].Value + "'>" + obj[i].Text + "</option>");
                        }

                        $('.cgTypeRequisitionReimbursement').show();
                    }

                    $('.cgVendor').hide();
                });
            }
            else {
                $('.cgTypeRequisitionReimbursement').hide();
                $('.cgVendor').hide();

                $('.typeRequisitionReimbursement').html('');
            }

            $('#formGoodAndService').html('');
            $('#itemGoodAndService').attr('style', 'padding-bottom: 150px');
        });

        $(document).off("change", ".typeRequisitionReimbursement");
        $(document).on("change", ".typeRequisitionReimbursement", function (e) {
            e.preventDefault();

            $('.vendor').val('').trigger('chosen:updated');

            var val = $(this).val();
            
            if (val != null && val != undefined && val != "") {
                $('.cgVendor').show();
                //if (val == "80") { alert("ASD!"); }
            }
            else {
                $('.cgVendor').hide();
            }

            $('#formGoodAndService').html('');
            $('#itemGoodAndService').attr('style', 'padding-bottom: 150px');
        });

        $(document).off("change", ".vendor");
        $(document).on("change", ".vendor", function (e) {
            e.preventDefault();

            var val = $(this).val();
            var valGoodsOrServices = $('.goodsOrServices').val();
            var valRequisitionOrReimbursement = $('.requisitionOrReimbursement').val();
            var valTypeRequisitionReimbursement = $('.typeRequisitionReimbursement').val();
            var studentPacketCourseId = $("#studentPacketCourseId").val();
            var courseId = $("#courseId").val();

            if (val != null && val != undefined && val != "") {
                fpcs.renderPartial('/GoodAndService/ChoosePartialForm?goodOrService=' + valGoodsOrServices +
                                   '&requisitionOrReimbursement=' + valRequisitionOrReimbursement +
                                   '&typeRequisitionReimbursement=' + valTypeRequisitionReimbursement +
                                   '&vendor=' + val +
                                   '&studentPacketCourseId=' + studentPacketCourseId +
                                   '&courseId=' + courseId +
                                   '&isReadOnly=false',
                                   'formGoodAndService',
                                   function (obj, data, textStatus) {
                                       fpcs.goodService.initActionCreateGoodService();
                                   });

                $('#itemGoodAndService').attr('style', '');
            }
            else {
                $('#formGoodAndService').html('');
                $('#itemGoodAndService').attr('style', 'padding-bottom: 150px');
            }
        });
    },

    initActionCreateGoodService: function () {
        $(document).off("click", "#goodAndService .createGoodService");
        $(document).on("click", "#goodAndService .createGoodService", function (e) {
            e.preventDefault();

            var params = {
                Id: $("#goodAndService #Id").val(),
                StudentPacketId: $("#goodAndService #StudentPacketId").val(),
                StudentPacketCourseId: $("#goodAndService #StudentPacketCourseId").val(),
                CourseId: $("#goodAndService #CourseId").val(),
                TempId: $("#goodAndService #TempId").val(),
                GoodOrService: $("#goodAndService #GoodOrService").val(),
                RequisitionOrReimbursement: $("#goodAndService #RequisitionOrReimbursement").val(),
                TypeRequisitionReimbursement: $("#goodAndService #TypeRequisitionReimbursement").val(),
                VendorId: $("#goodAndService #vendorId").chosen().val(),
                Total: $("#goodAndService #Total").val(),
                Title: $("#goodAndService #Title").val(),
                Description: $("#goodAndService #Description").val(),
                PublisherISBN: $("#goodAndService #PublisherISBN").val(),
                Comments: $("#goodAndService #Comments").val(),
                NumberOfUnits: $("#goodAndService #NumberOfUnits").val(),
                UnitPrice: $("#goodAndService #UnitPrice").val(),
                ShippingHandlingFees: $("#goodAndService #ShippingHandlingFees").val(),
                TypeCall: $("#goodAndService #TypeCall").val()
            };

            fpcs.sendForm3('/GoodAndService/__UniversalGoodService', params, function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.goodService.reloadGrid($("#goodAndService #TypeCall").val());
                    $("#itemGoodAndService").html('');

                    if (data.Obj != null) {
                        var jsonData = JSON.parse(data.Obj);
                        if (jsonData.Sponsorship != undefined) {
                            var sponsorshipOut = $("#sponsorshipOut").val() * 1;
                            $("#sponsorshipEdit").html("$" + jsonData.Sponsorship.toFixed(2));
                            $("#spnSponsorshipEdit").html("$" + jsonData.Sponsorship.toFixed(2));
                        }
                    }
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
                else {
                    $("#itemGoodAndService").html(data);
                    fpcs.goodService.initUniversalSaveDialog();
                }
            });
        });

        $(document).off("click", "#goodAndService .cancelGoodService");
        $(document).on("click", "#goodAndService .cancelGoodService", function (e) {
            $('#itemGoodAndService').html('');
        });

        $(document).off("change", "#goodAndService #NumberOfUnits");
        $(document).on("change", "#goodAndService #NumberOfUnits", function (e) {
            var numberOfUnits = $("#goodAndService #NumberOfUnits").val() * 1;
            var unitPrice = $("#goodAndService #UnitPrice").val() * 1;
            var shippingHandlingFees = $("#goodAndService #ShippingHandlingFees").val() * 1;

            if (isNaN(numberOfUnits)) { numberOfUnits = 0; }
            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(shippingHandlingFees)) { shippingHandlingFees = 0; }

            $("#goodAndService #Total").val(numberOfUnits * unitPrice + shippingHandlingFees);
        });

        $(document).off("change", "#goodAndService #UnitPrice");
        $(document).on("change", "#goodAndService #UnitPrice", function (e) {
            var numberOfUnits = $("#goodAndService #NumberOfUnits").val() * 1;
            var unitPrice = $("#goodAndService #UnitPrice").val() * 1;
            var shippingHandlingFees = $("#goodAndService #ShippingHandlingFees").val() * 1;

            if (isNaN(numberOfUnits)) { numberOfUnits = 0; }
            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(shippingHandlingFees)) { shippingHandlingFees = 0; }

            $("#goodAndService #Total").val(numberOfUnits * unitPrice + shippingHandlingFees);
        });

        $(document).off("change", "#goodAndService #ShippingHandlingFees");
        $(document).on("change", "#goodAndService #ShippingHandlingFees", function (e) {
            var numberOfUnits = $("#goodAndService #NumberOfUnits").val() * 1;
            var unitPrice = $("#goodAndService #UnitPrice").val() * 1;
            var shippingHandlingFees = $("#goodAndService #ShippingHandlingFees").val() * 1;

            if (isNaN(numberOfUnits)) { numberOfUnits = 0; }
            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(shippingHandlingFees)) { shippingHandlingFees = 0; }

            $("#goodAndService #Total").val(numberOfUnits * unitPrice + shippingHandlingFees);
        });

        $(document).off("change", "#goodAndService #NumberOfSemesters");
        $(document).on("change", "#goodAndService #NumberOfSemesters", function (e) {
            var numberOfSemesters = $("#goodAndService #NumberOfSemesters").val() * 1;
            var costPerSemester = $("#goodAndService #CostPerSemester").val() * 1;

            if (isNaN(numberOfSemesters)) { numberOfSemesters = 0; }
            if (isNaN(costPerSemester)) { costPerSemester = 0; }

            $("#goodAndService #Total").val(numberOfSemesters * costPerSemester);
        });

        $(document).off("change", "#goodAndService #CostPerSemester");
        $(document).on("change", "#goodAndService #CostPerSemester", function (e) {
            var numberOfSemesters = $("#goodAndService #NumberOfSemesters").val() * 1;
            var costPerSemester = $("#goodAndService #CostPerSemester").val() * 1;

            if (isNaN(numberOfSemesters)) { numberOfSemesters = 0; }
            if (isNaN(costPerSemester)) { costPerSemester = 0; }

            $("#goodAndService #Total").val(numberOfSemesters * costPerSemester);
        });
    },

    initActionCreateGoodServiceApproval: function () {
        $(document).off("click", ".createGoodService");
        $(document).on("click", ".createGoodService", function (e) {
            e.preventDefault();
            fpcs.sendForm2("#createGoodOrServiceForm", function (data, textStatus) {
                if (typeof data == "object" && data.ErrorCode == 200) {
                    fpcs.fpcsGoodService.reloadGrid();
                    fpcs.closeDialog();
                }
                else if (typeof data == "object" && data.ErrorCode == 800) {
                    alert(data.Message);
                }
                else if (typeof data == "object" && data.ErrorCode == 900) {
                    alert(data.Message);
                }
                else {
                    fpcs.showDialog("Good/Service", data);
                    fpcs.goodService.initUniversalSaveDialogApproval();
                }
            });
        });

        $(document).off("click", ".cancelGoodService");
        $(document).on("click", ".cancelGoodService", function (e) {
            fpcs.closeDialog();
        });

        $(document).off("change", "#NumberOfUnits");
        $(document).on("change", "#NumberOfUnits", function (e) {
            var numberOfUnits = $("#NumberOfUnits").val() * 1;
            var unitPrice = $("#UnitPrice").val() * 1;
            var shippingHandlingFees = $("#ShippingHandlingFees").val() * 1;

            if (isNaN(numberOfUnits)) { numberOfUnits = 0; }
            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(shippingHandlingFees)) { shippingHandlingFees = 0; }

            $("#Total").val(numberOfUnits * unitPrice + shippingHandlingFees);
        });

        $(document).off("change", "#UnitPrice");
        $(document).on("change", "#UnitPrice", function (e) {
            var numberOfUnits = $("#NumberOfUnits").val() * 1;
            var unitPrice = $("#UnitPrice").val() * 1;
            var shippingHandlingFees = $("#ShippingHandlingFees").val() * 1;

            if (isNaN(numberOfUnits)) { numberOfUnits = 0; }
            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(shippingHandlingFees)) { shippingHandlingFees = 0; }

            $("#Total").val(numberOfUnits * unitPrice + shippingHandlingFees);
        });

        $(document).off("change", "#ShippingHandlingFees");
        $(document).on("change", "#ShippingHandlingFees", function (e) {
            var numberOfUnits = $("#NumberOfUnits").val() * 1;
            var unitPrice = $("#UnitPrice").val() * 1;
            var shippingHandlingFees = $("#ShippingHandlingFees").val() * 1;

            if (isNaN(numberOfUnits)) { numberOfUnits = 0; }
            if (isNaN(unitPrice)) { unitPrice = 0; }
            if (isNaN(shippingHandlingFees)) { shippingHandlingFees = 0; }

            $("#Total").val(numberOfUnits * unitPrice + shippingHandlingFees);
        });

        $(document).off("change", "#NumberOfSemesters");
        $(document).on("change", "#NumberOfSemesters", function (e) {
            var numberOfSemesters = $("#NumberOfSemesters").val() * 1;
            var costPerSemester = $("#CostPerSemester").val() * 1;

            if (isNaN(numberOfSemesters)) { numberOfSemesters = 0; }
            if (isNaN(costPerSemester)) { costPerSemester = 0; }

            $("#Total").val(numberOfSemesters * costPerSemester);
        });

        $(document).off("change", "#CostPerSemester");
        $(document).on("change", "#CostPerSemester", function (e) {
            var numberOfSemesters = $("#NumberOfSemesters").val() * 1;
            var costPerSemester = $("#CostPerSemester").val() * 1;

            if (isNaN(numberOfSemesters)) { numberOfSemesters = 0; }
            if (isNaN(costPerSemester)) { costPerSemester = 0; }

            $("#Total").val(numberOfSemesters * costPerSemester);
        });
    },

    initCreateGoodServiceDialog: function (typeCall) {
        $(document).off("click", "#addGoodOrServiceDialog");
        $(document).on("click", "#addGoodOrServiceDialog", function (e) {
            fpcs.goodService.showCreateGoodServiceDialog(typeCall);
        });
    },

    showCreateGoodServiceDialog: function (typeCall) {
        var vendorId = 0;
        var studentPacketId = $("#studentPacketId").val();
        var studentPacketCourseId = $("#studentPacketCourseId").val();
        var courseId = $("#courseId").val();
        var tempId = $("#tempId").val();

        if (studentPacketId == null || studentPacketId == undefined)
            studentPacketId = 0;

        if (studentPacketCourseId == null || studentPacketCourseId == undefined)
            studentPacketCourseId = 0;

        if (courseId == null || courseId == undefined)
            courseId = 0;

        if (tempId == undefined)
            tempId = '';

        fpcs.getPartial('/GoodAndService/__UniversalGoodService?' +
                            'studentPacketId=' + studentPacketId +
                            '&studentPacketCourseId=' + studentPacketCourseId +
                            '&courseId=' + courseId +
                            '&tempId=' + tempId +
                            '&typeCall=' + typeCall,
        function (data, textStatus) {
            fpcs.showInternalDialog("#itemGoodAndService", data);
            fpcs.goodService.initUniversalSaveDialog();
        });
    },
    
    reloadGrid: function () {
        var studentPacketId = $("#studentPacketId").val();
        var studentPacketCourseId = $("#studentPacketCourseId").val();
        var courseId = $("#courseId").val();
        var tempId = $("#tempId").val();
        var typeCall = $("#typeCall").val();

        if (studentPacketId == null ||studentPacketId == undefined)
            studentPacketId = 0;

        if (studentPacketCourseId == null || studentPacketCourseId == undefined)
            studentPacketCourseId = 0;

        if (courseId == null || courseId == undefined)
            courseId = 0;

        if (tempId == undefined)
            tempId = null;

        if (typeCall == undefined)
            typeCall = 0;

        fpcs.getPartial('/GoodAndService/_TableGoodAndService?studentPacketId=' + studentPacketId +
                                                            "&studentPacketCourseId=" + studentPacketCourseId +
                                                            "&courseId=" + courseId +
                                                            "&tempId=" + tempId,
        function (data, textStatus) {
            fpcs.showInternalDialog("#tableGoodAndService", data);
            if(typeCall == 0)
                fpcs.goodService.initDetailsGoodServiceDialog(0);
            else
                fpcs.goodService.initDetailsGoodServiceDialog(1);
            fpcs.goodService.initDeleteGoodService(typeCall);
        });

        if (studentPacketCourseId != undefined && studentPacketCourseId != 0) {
            fpcs.getPartial('/StudentPacket/GetStudentPacketCourse?studentPacketCourseId=' + studentPacketCourseId,
            function (data, textStatus) {
                fpcs.showInternalDialog($("table[data-id='" + studentPacketCourseId + "']").parent(), data);
            });
        }
    },

    showOrHideLineItems: function (obj, e) {
        e.preventDefault();

        var attr = $(obj).attr("hiddenAttr");
        var goodServiceId = $(obj).siblings(".hdnGoodAndService").val();
        var trs = $(obj).parents("table").find("tr[gs='" + goodServiceId + "']");

        if (attr == "show") {
            $.each(trs, function(index, value) {
                $(value).show();
            });

            $(obj).attr("hiddenAttr", "hide");
            $(obj).html("hide");
        } else {
            $.each(trs, function (index, value) {
                $(value).hide();
            });

            $(obj).attr("hiddenAttr", "show");
            $(obj).html("show");
        }
    },

    initGoodAdministrativeSaveDialog : function () {
    },

    initGoodSuppliesSaveDialog: function () {
    },

    initGoodTextbookSaveDialog: function () {
    },

    initServiceAdministrativeSaveDialog: function () {
    },

    initServiceASDClassSaveDialog: function () {
    },

    initServiceComputerLeaseSaveDialog: function () {
    },

    initServiceInternetSaveDialog: function () {
    },

    initServiceUniversityCourseSaveDialog: function () {
        fpcs.initDatePicker();
    },

    initServiceVendorServiceSaveDialog: function () {
        fpcs.initDatePicker();
    },

    initUniversalSaveDialog: function () {
        $('.vendor').chosen();

        fpcs.goodService.initActionCreateGoodService();
    },

    initUniversalSaveDialogApproval: function () {
        $('.vendor').chosen();

        fpcs.goodService.initActionCreateGoodServiceApproval();
    }
}