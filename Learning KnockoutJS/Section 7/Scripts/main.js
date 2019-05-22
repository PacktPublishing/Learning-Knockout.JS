require(['knockout-3.3.0', 'ViewModels/RequireViewModel'], function (ko, viewModel) {
    'use strict';
    ko.components.register('color-list', { require: 'Components/ColorListRequire' });
    ko.applyBindings(new viewModel());
});
