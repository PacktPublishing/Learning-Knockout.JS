var app = window.app || {};
app.PagerExtenderViewModel = (function (ko, db) {
    'use strict';
    var me = {
        catalog: ko.observableArray([]).extend({ pager: 4 })
    };

    function _init() {
        db.getCatalog(function (data) {
            me.catalog(data);
        });
    }

    _init();
    return me;
}(ko, app.DataContext));