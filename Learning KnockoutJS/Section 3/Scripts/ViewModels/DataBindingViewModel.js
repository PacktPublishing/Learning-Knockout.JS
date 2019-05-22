var app = window.app || {};
app.DataBindingViewModel = (function (ko) {
    'use strict';
    var me = {
        chosenColors: ko.observableArray([]),
        color: ko.observable(undefined),
        colors: ["Red", "Green", "Blue", "Yellow", "Black", "White"],
        isChecked: ko.observable(false),
        isDisabled: ko.observable(true),
        isEnabled: ko.observable(true),
        isFocused: ko.observable(false),
        keyValuePair: ko.observable(undefined),
        keyValuePairs: [{ Key: "First", Value: "1" }, { Key: "Second", Value: "2" }, { Key: "Third", Value: "3" }, { Key: "Fourth", Value: "4" }],
        message: ko.observable(''),
        ordinal: ko.observable(''),
        //
        loadMessage: loadMessage,
        showMessage: showMessage
    };

    function _init() {
        me.message.subscribe(function (v) {
            //alert("Your message is: " + v);
        });
        me.isFocused(true);
    }

    function loadMessage() {
        me.message("My favorite color is " + me.colors[Math.floor(Math.random() * me.colors.length)].toLowerCase());
    }

    function showMessage() {
        alert(me.message() ? me.message() : "Please type a message.");
    }

    _init();
    return me;
}(ko));