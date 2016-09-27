(function ($) {
    "use strict";

    var SemEditable = function (options) {
        this.init('sem_editable', options, SemEditable.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(SemEditable, $.fn.editabletypes.abstractinput);

    $.extend(SemEditable.prototype, {
        /**
        Renders input from tpl

        @method render() 
        **/
        render: function () {
            $('.date-picker').datepicker();
            this.$input = this.$tpl.find('input');
            this.$select = this.$tpl.find('select');
        },

        /**
        Default method to show value in element. Can be overwritten by display option.
        
        @method value2html(value, element) 
        **/
        value2html: function (value, element) {
            if (!value) {
                $(element).empty();
                return;
            }
            //var html = $('<div>').text(value.commentVal).html() + ' ' + $('<div>').text(value.markVal).html();
            var html = $('<div>').text(value.markVal).html();
            $(element).html(html);
        },

        /**
        Gets value from element's html
        
        @method html2value(html) 
        **/
        html2value: function (html) {
            /*
              you may write parsing method to get value by element's html
              e.g. "Moscow, st. Lenina, bld. 15" => {namesUserCheck: "Moscow", namesUserDate: "Lenina", namesUserComment: "15"}
              but for complex structures it's not recommended.
              Better set value directly via javascript, e.g. 
              editable({
                  value: {
                      namesUserCheck: "Moscow", 
                      namesUserDate: "Lenina", 
                      namesUserComment: "15"
                  }
              });
            */
            return null;
        },

        /**
         Converts value to string. 
         It is used in internal comparing (not for sending to server).
         
         @method value2str(value)  
        **/
        value2str: function (value) {
            var str = '';
            if (value) {
                for (var k in value) {
                    str = str + k + ':' + value[k] + ';';
                }
            }
            return str;
        },

        /*
         Converts string to value. Used for reading value from 'data-value' attribute.
         
         @method str2value(str)  
        */
        str2value: function (str) {
            /*
            this is mainly for parsing value defined in data-value attribute. 
            If you will always set value by javascript, no need to overwrite it
            */
            return str;
        },

        /**
         Sets value of input.
         
         @method value2input(value) 
         @param {mixed} value
        **/
        value2input: function (value) {
            if (!value) {
                return;
            }

            var isLocked = value.lockVal == 'True' || value.lockVal == true;
            var isAdmin = value.adminVal == 'True' || value.adminVal == true;

            this.$select.filter('[name="creditVal"]').val(value.creditVal);
            this.$select.filter('[name="markVal"]').val(value.markVal);
            this.$input.filter('[name="commentVal"]').val(value.commentVal);

            if (isLocked) {
                this.$input.filter('[name="lockVal"]').attr('checked', true);
            }
            else {
                this.$input.filter('[name="lockVal"]').removeAttr('checked');
            }

            if (isAdmin) {
                this.$input.filter('[name="adminVal"]').attr('checked', true);
            }
            else {
                this.$input.filter('[name="adminVal"]').removeAttr('checked');
            }

            if (isLocked && !isAdmin) {
                var selects = this.$select;
                $.each(selects, function (index, elem) {
                    $(elem).attr('readonly', true);
                    $(elem).attr('disabled', true);
                });

                var inputs = this.$input;
                $.each(inputs, function (index, elem) {
                    $(elem).attr('readonly', true);
                    $(elem).attr('disabled', true);
                });
            }

            if (!isAdmin) {
                this.$input.filter('[name="lockVal"]').attr('readonly', true);
                this.$input.filter('[name="lockVal"]').attr('disabled', true);
            }
        },

        /**
         Returns value of input.
         
         @method input2value() 
        **/
        input2value: function () {
            return {
                creditVal: this.$select.filter('[name="creditVal"]').val(),
                markVal: this.$select.filter('[name="markVal"]').val(),
                lockVal: this.$input.filter('[name="lockVal"]').is(':checked'),
                adminVal: this.$input.filter('[name="adminVal"]').is(':checked'),
                commentVal: this.$input.filter('[name="commentVal"]').val()
            };
        },

        /**
        Activates input: sets focus on the first field.
        
        @method activate() 
       **/
        activate: function () {
            this.$select.filter('[name="markVal"]').focus();
        },

        /**
         Attaches handler to submit form in case of 'showbuttons=false' mode
         
         @method autosubmit() 
        **/
        autosubmit: function () {
            this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        }
    });

    SemEditable.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<div>'+
                '<label><span style="padding-left:30px">Mark: </span>' +
                    '<select name="markVal" style="width:100px;">' +
                        '<option value="A">A</option>' +
                        '<option value="B">B</option>' +
                        '<option value="C">C</option>' +
                        '<option value="D">D</option>' +
                        '<option value="F">F</option>' +
                        '<option value="I">I</option>' +
                        '<option value="P">P</option>' +
                        '<option value="O">O</option>' +
                        '<option value="S">S</option>' +
                        '<option value="N">N</option>' +
                    '</select>' +
                 '</label>' +
                 '<label style="padding-left:15px;"><span>Lock: </span>' +
                    '<input type="checkbox" name="lockVal" />' +
                    '<input type="checkbox" name="adminVal" style="display:none" />' +
                 '</label>' +
             '</div>' +
             '<div><label><span style="padding-left:23px">Credit: </span>' +
                '<select name="creditVal">' +
                    '<option value="0">0</option>' +
                    '<option value="0.50">0.5</option>' +
                    '<option value="1.00">1.0</option>' +
                '</select>' +
             '</label></div>' +
             '<div><label><span>Comment: </span><input type="text" name="commentVal"></label></div>',
        inputclass: ''
    });

    $.fn.editabletypes.sem_editable = SemEditable;

}(window.jQuery));