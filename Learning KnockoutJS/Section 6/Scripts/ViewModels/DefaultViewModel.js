var app = window.app || {};
app.DefaultViewModel = (function (ko, db) {
    'use strict';
    var me = {
        borrowed: undefined,
        borrowers: ko.observableArray([]),
        catalog: ko.observableArray([]),
        media: ko.observable(undefined),
        possessed: undefined,
        //
        cancel: cancel,
        checkIn: checkIn,
        checkOut: checkOut,
        save: save
    };

    function _init() {
        db.getBorrowers(function (data) {
            var a = [];
            ko.utils.arrayForEach(data || [], function (item) {
                a.push(new app.Borrower(item.Name, item.Email));
            });
            me.borrowers(a);
        });
        db.getCatalog(function (data) {
            var a = [],
                m = null;
            ko.utils.arrayForEach(data || [], function (item) {
                m = new app.Media(item.ISBN, item.MediaType, item.Name, item.Borrower, item.DueDate);
                m.Borrower.extend({ required: "Borrower is required" });
                m.DueDate.extend({ required: "Due Date is required" });
                a.push(m);
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
                return (l.MediaType() === r.MediaType() ? 0 : l.MediaType() > r.MediaType() ? 1 : -1) || (l.Name() === r.Name() ? 0 : l.Name() > r.Name() ? 1 : -1);
            });
        }, me);
    }

    function cancel() {
        me.media().Borrower('');
        me.media().DueDate(undefined);
        me.media(undefined);
    }

    function checkIn(obj, evt) {
        obj.Borrower('');
        obj.DueDate(undefined);
        db.saveMedia(ko.toJS(obj));
    }

    function checkOut(obj, evt) {
        me.media(obj);
    }

    function save() {
        if (!me.media().HasError() && !me.media().Borrower.hasError() && !me.media().DueDate.hasError()) {
            db.saveMedia(ko.toJS(me.media()));
            me.media(undefined);
        }
    }

    _init();
    return me;
}(ko, app.DataContext));
