var SketchfabSDK = require('../src/Sketchfab');

var sketchfabSDK = new SketchfabSDK();

sketchfabSDK.Collections.all().then(function(response){
    console.log('\n\n\n\nAll');
    console.log(response.results.map(function(result){
        return result.name + ' by ' + result.user.displayName + ' (' + result.uid + ')';
    }));
});

sketchfabSDK.Collections.all({
    user: 'e5a1513d95db4f2ebb2a3a41ce587c03'
}).then(function(response){
    console.log('\n\n\n\nCollections created by bartv');
    console.log(response.results.map(function(result){
        return result.name + ' by ' + result.user.displayName + ' (' + result.uid + ')';
    }));
});
