(function ($) {
    "use strict";
    
    var AmpEditable = function (options) {
        this.init('amp_editable', options, AmpEditable.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(AmpEditable, $.fn.editabletypes.abstractinput);

    $.extend(AmpEditable.prototype, {
        /**
        Renders input from tpl

        @method render() 
        **/
        render: function () {
            var htmlText = '';
            $.each(this.sourceData, function (index, elem) {
                htmlText += '<option value="' + elem.value + '">' + elem.text + '</option>';
            });
            this.$tpl.find('select').html(htmlText);
            
            $('.date-picker').datepicker();
            this.$input = this.$tpl.find('textarea');
            this.$select = this.$tpl.find('select');
        },

        sourceData: [
                { value: 0, text: 'N/A' },
                { value: 1, text: 'Advanced' },
                { value: 2, text: 'Proficient' },
                { value: 3, text: 'Below Proficient' },
                { value: 4, text: 'Far Below Proficient' },
                { value: 5, text: 'Parent Refusal' },
                { value: 6, text: 'Absent' }
        ],

        /**
        Default method to show value in element. Can be overwritten by display option.
        
        @method value2html(value, element) 
        **/
        value2html: function (value, element) {
            var text = '',
                items = $.fn.editableutils.itemsByValue(value.markVal, this.sourceData);

            if (items.length) {
                text = items[0].text;
            }

            if (!value) {
                $(element).empty();
                return;
            }

            var html = $('<div>').text(text).html();
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
            this.$select.filter('[name="markVal"]').val(value.markVal);
            this.$input.filter('[name="commentVal"]').val(value.commentVal);
        },

        /**
         Returns value of input.
         
         @method input2value() 
        **/
        input2value: function () {
            return {
                markVal: this.$select.filter('[name="markVal"]').val(),
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

    AmpEditable.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<div><label>' +
                '<select name="markVal">' +
                '</select>' +
             '</label></div>' +
             '<div><label><textarea name="commentVal"></textarea></label></div>',
        inputclass: ''
    });

    $.fn.editabletypes.amp_editable = AmpEditable;

}(window.jQuery));