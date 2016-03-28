var SketchfabSDK = require('../src/Sketchfab');

var sketchfabSDK = new SketchfabSDK();

sketchfabSDK.Model.byId('387889bbe73648c38589a3fffd1f876c').then(function(response){
    console.log(response);
});

sketchfabSDK.Model.annotations('387889bbe73648c38589a3fffd1f876c').then(function(response){
    console.log(response);
});

sketchfabSDK.Model.comments('387889bbe73648c38589a3fffd1f876c').then(function(response){
    console.log(response);
});
