mydefine([],function(){

var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
"Thursday", "Friday", "Saturday"];

return {
    name: function(number) {return names[number];},
    dnumber: function(name) {return names.indexOf(name);},
    saysomething: function(something) {console.log("(weekDay2.js) say " + something);}
};
},"weekDay2.js");

