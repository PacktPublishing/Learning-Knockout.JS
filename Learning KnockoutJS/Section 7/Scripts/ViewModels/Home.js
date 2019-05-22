define(function (require) {
    var app = require('durandal/app'),
        ko = require('knockout'),
        me = {
            colors: ["Red", "Green", "Blue", "Yellow", "Black", "White"],
            selectedColor: ko.observable(''),
            showColor: showColor
        };

    function showColor(c) {
        me.selectedColor(c);
    }

    return me;
});
