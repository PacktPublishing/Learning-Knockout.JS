requirejs.config({
    paths: {
        'text': 'text',
        'durandal': 'durandal',
        'plugins': 'durandal/plugins',
        'transitions': 'durandal/transitions',
        'knockout': 'knockout-3.3.0',
        'jquery': 'jquery-2.1.4'
    }
});
define(['durandal/system', 'durandal/app', 'durandal/viewLocator'], function (system, app, viewLocator) {
    app.title = 'Welcome to Durandal';
    app.configurePlugins({
        router: true,
        dialog: true
    });
    app.start().then(function () {
        viewLocator.useConvention();
        app.setRoot('ViewModels/Home', 'entrance');
    });
});