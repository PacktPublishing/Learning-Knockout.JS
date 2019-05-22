var app = window.app || {};
app.Media = function (isbn, mediaType, name, borrower, dueDate) {
    'use strict';
    this.ISBN = ko.observable(isbn);
    this.MediaType = ko.observable(mediaType).extend({ required: "Media Type is required" });
    this.Name = ko.observable(name).extend({ required: "Name is required" });
    this.Borrower = ko.observable(borrower ? borrower : '');
    this.DueDate = ko.observable(dueDate ? dueDate : undefined).extend({ validDate: "Due Date is invalid" });
    this.HasError = ko.pureComputed(function () {
        return this.MediaType.hasError() || this.Name.hasError() || this.DueDate.hasError();
    }, this);
};