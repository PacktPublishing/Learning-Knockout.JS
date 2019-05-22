var app = window.app || {};
app.DataContext = (function ($) {
    'use strict';
    var me = {
        getCatalog: getCatalog
    };

    function getCatalog(callback) {
        if (typeof callback === 'function') {
            var catalog = localStorage["catalog"];
            if (catalog) {
                callback(JSON.parse(catalog));
            } else {
                $.getJSON('/Data/Catalog.json', function (data) {
                    localStorage["catalog"] = JSON.stringify(data.Catalog);
                    callback(data.Catalog);
                });
            }
        }
    }

    return me;
}(jQuery));