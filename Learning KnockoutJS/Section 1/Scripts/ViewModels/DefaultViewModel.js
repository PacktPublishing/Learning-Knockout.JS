var app = window.app || {};
app.DefaultViewModel = (function ($, ko) {
    'use strict';
    var me = {
        // The "title" property sets up our Subject of the Observer pattern
        title: ko.observable("Welcome to Learning Knockout.JS!"),
        update: update
    };

    function update() {
        $.getJSON('/Data/Sample.json', null, function (d) {
            // When we receive data from the server and update the "title" property, 
            //  it notifies the subscriber in the UI that it needs to update itself.
            me.title(d.title);
        })
    }

    return me;
}(jQuery, ko));