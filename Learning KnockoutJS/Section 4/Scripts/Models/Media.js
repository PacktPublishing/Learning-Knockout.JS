var app = window.app || {};
app.Media = function (isbn, mediaType, name) {
    'use strict';
    this.ISBN = ko.observable(isbn);
    this.MediaType = ko.observable(mediaType);
    this.Name = ko.observable(name);
};
app.Media.prototype.toString = function () {
    return this.Name() + " (" + this.MediaType() + ") [" + this.ISBN() + "]";
};