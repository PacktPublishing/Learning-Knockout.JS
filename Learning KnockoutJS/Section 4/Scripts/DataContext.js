var app = window.app || {};
app.DataContext = (function ($) {
    'use strict';
    var me = {
        deleteBorrower: deleteBorrower,
        deleteMedia: deleteMedia,
        getBorrowers: getBorrowers,
        getCatalog: getCatalog,
        getGuid: getGuid,
        getMediaTypes: getMediaTypes,
        saveBorrower: saveBorrower,
        saveMedia: saveMedia
    };

    function deleteBorrower(obj) {
        var borrowers = localStorage["borrowers"],
            data = [],
            exists = false,
            i = 0,
            l = 0;
        if (borrowers) {
            data = JSON.parse(borrowers);
            if ($.isArray(data)) {
                for (i = 0, l = data.length; i < l; i++) {
                    if (data[i].Email === obj.Email) {
                        exists = true;
                        break;
                    }
                }
                if (exists) {
                    data.splice(i, 1);
                }
            }
            localStorage["borrowers"] = JSON.stringify(data);
        }
    }

    function deleteMedia(obj) {
        var catalog = localStorage["catalog"],
            data = [],
            exists = false,
            i = 0,
            l = 0;
        if (catalog) {
            data = JSON.parse(catalog);
            if ($.isArray(data)) {
                for (i = 0, l = data.length; i < l; i++) {
                    if (data[i].ISBN === obj.ISBN) {
                        exists = true;
                        break;
                    }
                }
                if (exists) {
                    data.splice(i, 1);
                }
            }
            localStorage["catalog"] = JSON.stringify(data);
        }
    }

    function getBorrowers(callback) {
        var borrowers = null;
        if ($.isFunction(callback)) {
            borrowers = localStorage["borrowers"];
            if (borrowers) {
                callback(JSON.parse(borrowers));
            } else {
                $.getJSON('/Data/Borrowers.json', function (data) {
                    localStorage["borrowers"] = JSON.stringify(data.Borrowers);
                    callback(data.Borrowers);
                });
            }
        }
    }

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

    function getGuid() {
        return (function guid(value) {
            return value ? (value ^ Math.random() * 16 >> value / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, guid);
        })();
    }

    function getMediaTypes(callback) {
        if ($.isFunction(callback)) {
            $.getJSON('/Data/MediaTypes.json', function (data) {
                callback(data.MediaTypes);
            });
        }
    }

    function saveBorrower(obj) {
        var borrowers = localStorage["borrowers"],
            data = [],
            exists = false,
            i = 0,
            l = 0;
        if (borrowers) {
            data = JSON.parse(borrowers);
            if ($.isArray(data)) {
                for (i = 0, l = data.length; i < l; i++) {
                    if (data[i].Email === obj.Email) {
                        data[i] = obj;
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    data.push(obj);
                }
                localStorage["borrowers"] = JSON.stringify(data);
            }
        }
    }

    function saveMedia(obj) {
        var catalog = localStorage["catalog"],
            data = [],
            exists = false,
            i = 0,
            l = 0;
        if (catalog) {
            data = JSON.parse(catalog);
            if ($.isArray(data)) {
                for (i = 0, l = data.length; i < l; i++) {
                    if (data[i].ISBN === obj.ISBN) {
                        data[i] = obj;
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    data.push(obj);
                }
                localStorage["catalog"] = JSON.stringify(data);
            }
        }
    }

    return me;
}(jQuery));