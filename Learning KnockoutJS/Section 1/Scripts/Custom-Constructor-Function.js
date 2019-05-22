var obj = function () {
    // The "this" literal object is created automatically
    //var this = {};

    this.publisher = "Packt Publishing";
    this.title = "Learning Knockout.JS";
    this.author = "Robert Gaut";

    // The "this" literal object is returned automatically
    // return this;
};

//Create a new instance
var obj2 = new obj();

alert(obj2.title);