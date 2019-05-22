var obj = function () {
    var _presents = " Presents:\n",
        _by = "\nBy ",
        me = {
            publisher: "Packt Publishing",
            title: "Learning Knockout.JS",
            author: "Robert Gaut",
            //Reference the privately declared function through a pointer
            formatted: privateFormatted
        };

    function privateFormatted() {
        //By accessing variables defined in the outer function, you're creating a closure
        return me.publisher + _presents + me.title + _by + me.author;
    }

    //Return the public interface
    return me;
};

//Create a new instance
var obj2 = new obj();

alert(obj2.formatted());

//Also...
//alert(obj2.publisher);
//alert(obj2.title);
//alert(obj2.author);

//Notice that you cannot access the _presents and _by variables; they're "private."
//alert(obj2._presents);
//alert(obj2._by);