var app = window.app || {};
app.Borrower = function (name, email) {
    'use strict';
    this.Name = ko.observable(name).extend({ required: "Name is required" });
    this.Email = ko.observable(email).extend({ required: "Email is required" });
    this.HasError = ko.pureComputed(function () {
        return this.Name.hasError() || this.Email.hasError();;
    }, this);
};