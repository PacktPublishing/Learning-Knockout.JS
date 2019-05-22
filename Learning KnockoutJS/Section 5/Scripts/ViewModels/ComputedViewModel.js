var app = window.app || {};
app.ComputedViewModel = (function (ko) {
    'use strict';
    var me = {
        phone: undefined,
        output: ko.observable('')
    };

    function _init() {
        me.phone = ko.pureComputed({
            read: me.output,
            write: function (newValue) {
                me.output(newValue.replace(/[^\d\.]+/g, '').substring(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
            }
        });
    }

    _init();
    return me;
}(ko));
