var obj = (function () {
    var _presents = " Presents:\n",
        _by = "\nBy ",
        me = {
            publisher: "Packt Publishing",
            title: "Learning Knockout.JS",
            author: "Robert Gaut",
            formatted: privateFormatted
        };

    function privateFormatted() {
        return me.publisher + _presents + me.title + _by + me.author;
    }

    return me;
})();
//The parenthesis enclosing the function expression and the closing "()" parentheses
//  makes this an IIFE - Immediately Invoked Function Expression

//Notice that the "new" keyword isn't used here to create an object. The IIFE created itself.
//This means that there can only be one instance of this object.
alert(obj.formatted());




