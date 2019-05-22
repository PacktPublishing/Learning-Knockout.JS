var app = window.app || {};
app.Borrower = function (name, email) {
    'use strict';
    this.Name = ko.observable(name);
    this.Email = ko.observable(email);
};