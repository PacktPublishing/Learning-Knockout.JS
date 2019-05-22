define(['knockout-3.3.0'], function (ko) {
    'use strict';
    return function RequireViewModel() {
        var me = {
            selectedColor: ko.observable(undefined),
            showColor: showColor
        };

        function showColor(c) {
            me.selectedColor(c);
        };

        return me;
    };
});
