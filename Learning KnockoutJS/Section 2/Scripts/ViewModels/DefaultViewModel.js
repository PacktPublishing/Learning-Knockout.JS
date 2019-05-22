var app = window.app || {};
app.DefaultViewModel = (function (ko, db) {
    'use strict';
    var me = {
        catalog: ko.observableArray([]),
        init: init
    };

    function init() {
        db.getCatalog(function (data) {
            var a = [];
            ko.utils.arrayForEach(data || [], function (item) {
                a.push(new app.Media(item.ISBN, item.MediaType, item.Name));
            });
            me.catalog(a);
        });
    }

    return me;
}(ko, app.DataContext));
