if (!('fpcs' in window)) window['fpcs'] = {};

//-------------------------Ajax----------------------------------------------
//executeService('@Url.Action("Create1")', params, function (data, textStatus) { });
fpcs.executeService = function (url, params, callbackSuccess) {
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(params),
        timeout: 1000000000,
        success: function(data, textStatus) {
            callbackSuccess.call(this, data, textStatus);
        },
        error: function() {
            fpcs.showErrorMessage();
        }
    });
};

fpcs.executeServiceWithConfirm = function (url, params, callbackSuccess) {
    jConfirm('Are you sure?', 'Confirmation', function (r) {
        if (r) {
            fpcs.executeService(url, params, callbackSuccess);
        }
    });

    //if (confirm()) {
        
    //}

    return false;
};

//action = '@Url.Action("Create1")'
//sendForm('myForm', function (data, textStatus) { });
fpcs.sendForm = function(formID, callbackSuccess) {
    var form = $('#' + formID);
    if (form.valid == null || form.valid()) {
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success: function(data, textStatus) {
                callbackSuccess.call(this, data, textStatus);
            },
            error: function(response) {
                fpcs.showErrorMessage();
            }
        });
    }
};

fpcs.sendForm2 = function (formID, callbackSuccess) {
    var form = $(formID);
    if (form.valid == null || form.valid()) {
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success: function (data, textStatus) {
                callbackSuccess.call(this, data, textStatus);
            },
            error: function (response) {
                fpcs.showErrorMessage();
            }
        });
    }
};

fpcs.sendForm3 = function (url, params, callbackSuccess) {
    $.ajax({
        type: "POST",
        url: url,
        data: params,
        success: function (data, textStatus) {
            callbackSuccess.call(this, data, textStatus);
        },
        error: function (response) {
            fpcs.showErrorMessage();
        }
    });
};

//getPartial('@Url.Action("Create1")', function (data, textStatus) { });
fpcs.getPartial = function (url, callbackSuccess) {
    fpcs.showLoader();
    $.ajax({
        type: "GET",
        url: url,
        success: function (data, textStatus) {
            callbackSuccess.call(this, data, textStatus);
            fpcs.hideLoader();
        },
        error: function (XMLHttpRequest, thrownError) {
            fpcs.hideLoader();
            fpcs.showErrorMessage();
        }
    });

    return false;
};

fpcs.getPartialThroughPost = function (url, params, callbackSuccess) {
    fpcs.showLoader();
    $.ajax({
        type: "POST",
        url: url,
        data: params,
        timeout: 1000000000,
        success: function (data, textStatus) {
            callbackSuccess.call(this, data, textStatus);
            fpcs.hideLoader();
        },
        error: function () {
            fpcs.hideLoader();
            fpcs.showErrorMessage();
        }
    });
};

//containerID - element id for the partial view
//renderPartial('@Url.Action("Create1")', 'containerID', function (data, textStatus) { });
fpcs.renderPartial = function (url, containerID, callbackSuccess) {
    fpcs.showLoader();
    fpcs.getPartial(url, function (data, textStatus) {
        $("#" + containerID).html(data);
        if (callbackSuccess != null) {
            callbackSuccess.call(this, data, textStatus);
        }
        fpcs.hideLoader();
    });

    return false;
};

fpcs.initTitleForDialog = function() {
    //override dialog's title function to allow for HTML titles
    $.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
        _title: function(title) {
            var $title = this.options.title || '&nbsp;'
            if (("title_html" in this.options) && this.options.title_html == true)
                title.html($title);
            else title.text($title);
        }
    }));
};

fpcs.showErrorMessage = function(text) {
    if (text == null) text = "Fail request";
    var clone = $(".main-alert").first().clone(true);
    clone.addClass("alert-error").insertAfter($(".main-alert").last());
    clone.find(".icon-bullhorn").addClass("red")
    clone.find(".main-alert-text").html(text);
    clone.slideDown();
};

fpcs.showMessage = function(text) {
    var clone = $(".main-alert").first().clone(true);
    clone.addClass("alert-success").insertAfter($(".main-alert").last());
    clone.find(".icon-bullhorn").addClass("green")
    clone.find(".main-alert-text").html(text);
    clone.slideDown();
};

fpcs.showDialog = function(title, html, width, isTop) {
    if (width == null) width = "65%";
    var position = ['center'];
    if (isTop == undefined || isTop) { position = ['top', 20]; }
    $("#dialog-message").html(html);
    var d = $("#dialog-message");
    var dialog = $("#dialog-message").dialog({
        resizable: false,
        draggable: true,
        modal: true,
        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i> " + title + "</h4></div>",
        title_html: true,
        width: width,
        position: position
    });
};

fpcs.closeDialog = function() {
    $("#dialog-message").dialog("close");
};

fpcs.showInternalDialog = function (obj, html) {
    $(obj).html(html);
}

fpcs.closeInternalDialog = function (obj) {
    $(obj).html('');
}

fpcs.initDatePicker = function() {
    $('.date-picker').datepicker().next().on(ace.click_event, function() {
        $(this).prev().focus();
    });

    $('.date-mask').mask("99/99/9999", { placeholder: " " });
};

fpcs.initTimePicker = function(selector) {
    $(selector).timepicker({ minuteStep: 1, showSeconds: false, showMeridian: true });
};

fpcs.initSpinner = function(selector, value, max, step) {
    $(selector).ace_spinner({
        value: value,
        min: 0,
        max: max != null ? max : 9999999,
        step: step != null ? step : 1,
        btn_up_class: 'btn-info',
        btn_down_class: 'btn-info'
    })
};

fpcs.showLoader = function () {
    $("#shadow").show();
    $("#loader").show();
};

fpcs.hideLoader = function () {
    $("#shadow").hide();
    $("#loader").hide();
};

fpcs.getIsAdmin = function () {
    return $("#roleCurrentUser").val() * 1 == 1;
};

fpcs.getIsTeacher = function () {
    return $("#roleCurrentUser").val() * 1 == 2;
};

fpcs.getIsGuardian = function () {
    return $("#roleCurrentUser").val() * 1 == 3;
};

fpcs.getCurrentUserId = function () {
    return $("#idCurrentUser").val();
};

fpcs.print = function (selector) {
    var text = document.getElementById(selector).innerHTML;
    var printwin = open('', 'printwin');
    printwin.document.open();
    printwin.document.writeln('<html>');
    printwin.document.writeln('<head>');
    printwin.document.writeln('<title></title>');
    printwin.document.writeln('<link rel="stylesheet" href="/Content/css/ace-fonts.css" />');
    printwin.document.writeln('<link rel="stylesheet" href="/Content/css/ace.min.css" />');
    printwin.document.writeln('<link rel="stylesheet" href="/Content/css/ace-responsive.min.css" />');
    printwin.document.writeln('<link rel="stylesheet" href="/Content/css/ace-skins.min.css" />');
    printwin.document.writeln('<link href="/Content/css/bootstrap.min.css" rel="stylesheet" />');
    printwin.document.writeln('<link href="/Content/css/bootstrap-responsive.min.css" rel="stylesheet" />');
    printwin.document.writeln('<link href="/Content/css/font-awesome.min.css" rel="stylesheet" />');
    printwin.document.writeln('<link rel="stylesheet" href="/Content/css/jquery-ui-1.10.3.full.min.css" />');
    printwin.document.writeln('<link rel="stylesheet" href="/Content/css/site.css" />');
    printwin.document.writeln('</head><body>');
    printwin.document.writeln(text);
    printwin.document.writeln('</body></html>');
    printwin.document.close();
    setTimeout(function () { printwin.print(); }, 3000);
    setTimeout(function () { printwin.close(); }, 3000);
    //os x snow leopard aurora 3000
    //os x snow leopard safari 2000
    return true;
};

fpcs.pdf = function(selector) {
    var html = document.getElementById(selector).innerHTML;

    var params = { htmlContent: html };
    fpcs.executeService("/Pdf/GenerateFromHtml", params, function (data) {
        location.href = "/Pdf/Get?guid=" + data;
    });
};

fpcs.buildUrl = function(url, parameters) {
    var qs = "";
    for (var key in parameters) {
        var value = parameters[key];

        if (value != undefined && value != "") {
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
    }

    if (qs.length > 0) {
        qs = qs.substring(0, qs.length-1);
        url = url + "?" + qs;
    }

    return url;
}