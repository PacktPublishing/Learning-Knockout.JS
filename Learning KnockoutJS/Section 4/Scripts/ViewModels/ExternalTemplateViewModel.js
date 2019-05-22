var app = window.app || {};
app.ExternalTemplateViewModel = (function ($, ko, db) {
    'use strict';
    var _templates = ['media-table', 'borrower-table'],
        me = {
            borrowers: ko.observableArray([]),
            catalog: ko.observableArray([]),
            //
            loadTemplates: loadTemplates
        };

    function _getBorrowers() {
        db.getBorrowers(function (data) {
            me.borrowers(data);
        });
    }

    function _getCatalog() {
        db.getCatalog(function (data) {
            me.catalog(data);
            _getBorrowers();
        });
    }

    function _init() {
        _getCatalog();
    }

    function loadTemplates(callback) {
        var counter = 0;
        ko.utils.arrayForEach(_templates, function (template) {
            $.get('/Templates/' + template + '.html', null, function (content) {
                $('body').append('<script id="' + template + '" type="text/html">' + content + '</script>');
                counter++;
                if ($.isFunction(callback) && _templates.length === counter) {
                    callback();
                }
            });
        });
    }

    _init();
    return me;
}(jQuery, ko, app.DataContext));