var app = window.app || {};
app.MediaViewModel = (function (ko, db) {
    'use strict';
    var me = {
        catalog: ko.observableArray([]),
        media: ko.observable(undefined),
        mediaTypes: ko.observableArray([]),
        newMedia: ko.observable(undefined),
        sortedCatalog: undefined,
        //
        add: add,
        cancel:cancel,
        edit: edit,
        remove: remove,
        saveEdit: saveEdit,
        saveNew: saveNew
    };

    function _init() {
        db.getMediaTypes(function (m) {
            me.mediaTypes(m);
        });
        db.getCatalog(function (data) {
            var a = [];
            ko.utils.arrayForEach(data || [], function (item) {
                a.push(new app.Media(item.ISBN, item.MediaType, item.Name, item.Borrower, item.DueDate));
            });
            me.catalog(a);
        });
        me.sortedCatalog = ko.pureComputed(function () {
            return this.catalog().sort(function (l, r) {
                return (l.MediaType() === r.MediaType() ? 0 : l.MediaType() > r.MediaType() ? 1 : -1) || (l.Name() === r.Name() ? 0 : l.Name() > r.Name() ? 1 : -1);
            });
        }, me);
    }

    function add() {
        me.newMedia(new app.Media(db.getGuid(), '', ''));
    }

    function cancel() {
        me.newMedia(undefined);
    }

    function edit(obj, evt) {
        me.media(obj);
    }

    function remove(obj, evt) {
        db.deleteMedia(ko.toJS(obj));
        me.catalog.remove(obj);
    }

    function saveEdit() {
        if (!me.media().HasError()) {
            db.saveMedia(ko.toJS(me.media()));
            me.media(undefined);
        }
    }

    function saveNew() {
        if (!me.newMedia().HasError()) {
            db.saveMedia(ko.toJS(me.newMedia()));
            me.catalog.push(me.newMedia());
            me.newMedia(undefined);
        }
    }

    _init();
    return me;
}(ko, app.DataContext));
