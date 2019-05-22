var app = window.app || {};
app.DefaultViewModel = (function (ko, db) {
    'use strict';
    var me = {
        borrowed: undefined,
        catalog: ko.observableArray([]),
        possessed: undefined,
    };

    function _init() {
        db.getCatalog(function (data) {
            var a = [];
            ko.utils.arrayForEach(data || [], function (item) {
                a.push(new app.Media(item.ISBN, item.MediaType, item.Name, item.Borrower, item.DueDate));
            });
            me.catalog(a);
        });
        me.borrowed = ko.pureComputed(function () {
            return ko.utils.arrayFilter(this.catalog(), function (item) {
                return item.Borrower() && item.DueDate();
            }).sort(function (l, r) {
                return new Date(l.DueDate()) > new Date(r.DueDate()) ? 1 : -1;
            });
        }, me);
        me.possessed = ko.pureComputed(function () {
            return ko.utils.arrayFilter(this.catalog(), function (item) {
                return !item.Borrower() || !item.DueDate();
            }).sort(function (l, r) {
                return (l.MediaType() === r.MediaType() ? 0 : l.MediaType() > r.MediaType() ? 1 : -1) ||
                    (l.Name() === r.Name() ? 0 : l.Name() > r.Name() ? 1 : -1);
            });
        }, me);
    }

    _init();
    return me;
}(ko, app.DataContext));
