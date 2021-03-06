/*global window, can*/
(function (window, can) {
    'use strict';

    window.AutoComplete = can.Control({
        defaults: {
            hideDelay: 200
        }
    },
    {
        init: function () {
            var self = this;
            this.element.addClass('auto-complete');
            if (this.options.listUrl) {
                var loading = can.ajax({
                    method: 'get',
                    url: this.options.listUrl,
                    dataType: 'json'
                });
                loading.done(function (result) {
                    self.options.list = result.list;
                });
                loading.fail(function () {
                    self.options.list = [];
                });
            }
        },

        'keypress': function (element, event) {
            var pattern = this.element.val() + String.fromCharCode(event.charCode);
            var match = this.getMatch(pattern);
            if (match) {
                event.preventDefault();
                this.element.val(match);
            }
        },

        getMatch: function (pattern) {
            var matches = [];
            can.each(this.options.list, function (key) {
                if (key.indexOf(pattern) === 0) {
                    matches.push(key);
                }
            });
            if (matches.length === 1) {
                return matches[0];
            } else {
                return null;
            }
        },

        openPopup: function (url) {
            var popup = window.open(url, '_blank', 'resizable');
            popup.focus();
        },

        focus: function () {
            this.element.focus();
        },

        delayHide: function () {
            var self = this;
            window.setTimeout(function () {
                self.element.hide();
            }, this.options.hideDelay);
        }
    });

})(window, can);