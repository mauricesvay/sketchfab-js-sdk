var SketchfabSDK = require('../src/Sketchfab');

var sketchfabSDK = new SketchfabSDK();

var token = '';

sketchfabSDK.Feed.all(token).then(function(response){
    console.log(response);
});
