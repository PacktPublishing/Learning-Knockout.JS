var app = window.app || {};
app.ForeachViewModel = (function () {
    'use strict';
    var me = {
        products: [
            { Name: 'Widget', Colors: ["Blue", "Yellow", "White"] },
            { Name: 'Gadget', Colors: ["Blue", "Red", "Yellow"] },
            { Name: 'Whatsit', Colors: ["Blue", "Green", "Yellow"] },
            { Name: 'Whosit', Colors: ["Green", "Yellow", "Black"] },
            { Name: 'Thingamabob', Colors: ["Blue", "Red", "White"] }]
    };

    return me;
}());