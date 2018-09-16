
var fs = require('fs');
global.mydefine = mydefine;
var defineCache = Object.create(null);
var currentMod = null;
var callsfrommain = 0;


function mydefine(depName, moduleFunction,callfrom) {

    if (callfrom == 'main'){
        callsfrommain = callsfrommain + 1;
    }
    
console.log("mydefine(array,callback," + callfrom + ",times:" + callsfrommain + ")");
console.log("moduleFunction is :" + moduleFunction);

    var myMod = currentMod;
    
    var dep = getModule(depName);
    
     if (!dep.loaded){
         dep.onLoad.push(whenDepsLoaded);
     }

    function whenDepsLoaded() {
                    console.log("whenDepsLoaded in mydefine(x,x," + callfrom + ")");           

                    //if(callfrom != 'weekDay4.js')
                   if(dep.loaded != true)
                   {
                       console.log("i will return because of something");
                       //return;
                   }

                   console.log("whenDepsLoaded,start loading something" );
                   var args = [dep.exports];

                   if (args[0] != null)
                   console.log("moduleFunction.apply.." + moduleFunction + " args:" + args[0].something());
                   
                   var exports = moduleFunction.apply(null, args);
                   if (myMod) {
                     myMod.exports = exports;
                     //console.log("exports:" + exports);
                     myMod.loaded = true;
                     myMod.onLoad.every(function(f) { console.log("about to run f() it is :" +  f); f(); });
                    } 
                }

    console.log("last row calling whenDepsLoaded()");            
    whenDepsLoaded();
 }



function getModule(name) {
    
  if (name in defineCache)
    return defineCache[name];

  var module = {exports: null,
                loaded: false,
                onLoad: [],
                modname: name
            };
  defineCache[name] = module;
 // backgroundReadFile(name, function(code) {
    fs.readFile(name,'utf8', function(err,code) {
    currentMod = module;
    //console.log(code);
    
    console.log("getModule, about to run this: " + code);
    new Function("", code)();
  });
  
  return module;
}




mydefine("/Users/admin/hello/weekDay4.js", function(thiscouldbeanything) {
    console.log("who is calling me!?");
    if (thiscouldbeanything == null)
    {
        console.log("thiscouldbeanything is null");
    }
    else {
    console.log(thiscouldbeanything.name(5));
    }
},"main");