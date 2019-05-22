var app = window.app || {};
app.BorrowerViewModel = (function (ko, db) {
    'use strict';
    var me = {
        borrowers: ko.observableArray([]),
        borrower: ko.observable(undefined),
        newBorrower: ko.observable(undefined),
        sortedBorrowers: undefined,
        //
        add: add,
        cancel: cancel,
        edit: edit,
        remove: remove,
        saveEdit: saveEdit,
        saveNew: saveNew
    };

    function _init() {
        db.getBorrowers(function (data) {
            var a = [];
            ko.utils.arrayForEach(data || [], function (item) {
                a.push(new app.Borrower(item.Name, item.Email));
            });
            me.borrowers(a);
        });
        me.sortedBorrowers = ko.pureComputed(function () {
            return this.borrowers().sort(function (l, r) {
                return (l.Name() === r.Name() ? 0 : l.Name() > r.Name() ? 1 : -1) || (l.Email() === r.Email() ? 0 : l.Email() > r.Email() ? 1 : -1);
            });
        }, me);
    }

    function add() {
        me.newBorrower(new app.Borrower('', ''));
    }

    function cancel() {
        me.newBorrower(undefined);
    }

    function edit(obj, evt) {
        me.borrower(obj);
    }

    function remove(obj, evt) {
        db.deleteBorrower(ko.toJS(obj));
        me.borrowers.remove(obj);
    }

    function saveEdit() {
        if (!me.borrower().HasError()) {
            db.saveBorrower(ko.toJS(me.borrower()));
            me.borrower(undefined);
        }
    }

    function saveNew() {
        if (!me.newBorrower().HasError()) {
            db.saveBorrower(ko.toJS(me.newBorrower()));
            me.borrowers.push(me.newBorrower());
            me.newBorrower(undefined);
        }
    }

    _init();
    return me;
}(ko, app.DataContext));
