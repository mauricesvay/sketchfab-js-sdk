var SketchfabSDK = require('../src/Sketchfab');

var sketchfabSDK = new SketchfabSDK();

sketchfabSDK.Categories.all().then(function(response){
    console.log(response);
});
