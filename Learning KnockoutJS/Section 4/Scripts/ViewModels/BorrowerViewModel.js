var app = window.app || {};
app.BorrowerViewModel = (function (ko, db) {
    'use strict';
    var me = {
        borrowers: ko.observableArray([]),
        //
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
    }

    function save() {
        ko.utils.arrayForEach(me.borrowers(), function (item) {
            db.saveBorrower(ko.toJS(item));
        });
    }

    _init();
    return me;
}(ko, app.DataContext));
