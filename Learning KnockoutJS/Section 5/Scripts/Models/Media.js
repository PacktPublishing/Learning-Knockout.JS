var app = window.app || {};
app.Media = function (isbn, mediaType, name, borrower, dueDate) {
    'use strict';
    this.ISBN = ko.observable(isbn);
    this.MediaType = ko.observable(mediaType);
    this.Name = ko.observable(name);
    this.Borrower = ko.observable(borrower ? borrower : '');
    this.DueDate = ko.observable(dueDate ? dueDate : undefined);
};