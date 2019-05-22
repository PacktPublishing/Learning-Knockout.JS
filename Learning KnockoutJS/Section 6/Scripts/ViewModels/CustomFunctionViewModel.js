var app = window.app || {};
app.CustomFunctionViewModel = (function (ko, db) {
    'use strict';
    var me = {
        books: undefined,
        catalog: ko.observableArray([]),
        cds: undefined,
        dvds: undefined,
        games: undefined,
        magazines: undefined
    };

    function _init() {
        db.getCatalog(function (data) {
            me.catalog(data);
        });
        me.books = me.catalog.filterByProperty('MediaType', 'Book');
        me.cds = me.catalog.filterByProperty('MediaType', 'CD');
        me.dvds = me.catalog.filterByProperty('MediaType', 'DVD');
        me.games = me.catalog.filterByProperty('MediaType', 'Game');
        me.magazines = me.catalog.filterByProperty('MediaType', 'Magazine');
    }

    _init();
    return me;
}(ko, app.DataContext));