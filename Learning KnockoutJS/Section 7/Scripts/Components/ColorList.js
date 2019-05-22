ko.components.register('color-list', {
    viewModel: function (params) {
        'use strict';
        var me = {
            colors: ["Red", "Green", "Blue", "Yellow", "Black", "White"],
            display: params.display
        };
        return me;
    },
    template: '<ul data-bind="foreach: colors">' +
        '<li data-bind="text: $data, click: $parent.display"></li></ul>'
});
