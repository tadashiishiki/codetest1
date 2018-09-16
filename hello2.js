
var fs = require('fs');
global.mydefine = mydefine;
var defineCache = Object.create(null);
var currentMod = null;
var callsfrommain = 0;


function mydefine(depNames, moduleFunction,callfrom) {

    if (callfrom == 'main'){
        callsfrommain = callsfrommain + 1;
    }
    
console.log("mydefine(array,callback," + callfrom + ",times:" + callsfrommain + ")");

    var myMod = currentMod;
     
    var deps = depNames.map(getModule);
    
    deps.forEach(function(mod) {
        console.log(mod.modname + ".loaded" + mod.loaded);
                   if (!mod.loaded)
                     mod.onLoad.push(whenDepsLoaded);
                 });

    function whenDepsLoaded() {
                    console.log("whenDepsLoaded in mydefine(x,x," + callfrom + ")");           

                   if (!deps.every(function(m) { return m.loaded; }))
                   {
                       console.log("i will return because of something");
                       return;
                   }

                   console.log("whenDepsLoaded,start loading something" );
                   var args = deps.map(function(m) { return m.exports; });
                   var exports = moduleFunction.apply(null, args);
                   if (myMod) {
                     myMod.exports = exports;
                     myMod.loaded = true;
                     myMod.onLoad.every(function(f) 
                             { 
                                 console.log("about to run f() it is :" +  f); 
                                 f(); 
                             });
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




mydefine(["/Users/admin/hello/weekDay2.js"], function(thiscouldbeanything) {
    console.log(thiscouldbeanything.name(2));
},"main");