var app = window.app || {};
app.CompositionViewModel = (function (b, m) {
    'use strict';
    var me = {
        borrowerViewModel: b,
        mediaViewModel: m,
        //
        details: details
    };

    function details(obj) {
        alert(obj.toString());
    }

    return me;
}(app.BorrowerViewModel, app.MediaViewModel));