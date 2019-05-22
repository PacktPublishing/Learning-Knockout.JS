var app = window.app || {};
app.ComponentViewModel = (function () {
    'use strict';
    var me = {
        showColor: showColor
    };

    function showColor(c) {
        alert(c);
    }

    return me;
}());