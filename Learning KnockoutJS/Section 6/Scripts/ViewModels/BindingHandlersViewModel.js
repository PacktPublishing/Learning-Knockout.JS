var app = window.app || {};
app.BindingHandlersViewModel = (function (ko) {
    'use strict';
    var me = {
        isClearOnFocus: ko.observable(true),
        toggleClearOnFocus: toggleClearOnFocus
    };

    function toggleClearOnFocus() {
        me.isClearOnFocus(!me.isClearOnFocus());
    }

    return me;
}(ko));