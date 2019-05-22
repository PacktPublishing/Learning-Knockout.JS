var obj = function () {
    //Private members
    var _presents = " Presents:\n",
        _by = "\nBy ";

    //Public interface
    return {
        publisher: "Packt Publishing",
        title: "Learning Knockout.JS",
        author: "Robert Gaut",
        formatted: function () {
            //By accessing variables defined in the outer function, you're creating a closure
            return this.publisher + _presents + this.title + _by + this.author;
        }
    };
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