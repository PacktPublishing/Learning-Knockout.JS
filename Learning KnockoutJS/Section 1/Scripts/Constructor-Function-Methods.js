var obj = function () {
    this.publisher = "Packt Publishing";
    this.title = "Learning Knockout.JS";
    this.author = "Robert Gaut";
    this.formatted = function () {
        return this.publisher + " Presents:\n" + this.title + "\nBy " + this.author;
    };
};

//Create a new instance
var obj2 = new obj();

alert(obj2.formatted());