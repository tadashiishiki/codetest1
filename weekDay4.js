mydefine("",function(){

    var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];

    var astring = "weekDayfile";
    
    return {
        name: function(number) {return names[number];},
        dnumber: function(name) {return names.indexOf(name);},
        saysomething: function(something) {console.log("(weekDay4.js) say " + something);},
        something: function() {return astring;}
    };
    },"weekDay4.js");
    
    