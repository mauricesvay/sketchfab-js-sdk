var SketchfabSDK = require('../src/Sketchfab');

var sketchfabSDK = new SketchfabSDK();

sketchfabSDK.Models.all().then(function(response){
    console.log('\n\n\n\nAll');
    console.log(response.results.map(function(result){
        return result.name + ' by ' + result.user.displayName;
    }));
});

sketchfabSDK.Models.recent().then(function(response){
    console.log('\n\n\n\nRecent');
    console.log(response.results.map(function(result){
        return result.name + ' by ' + result.user.displayName;
    }));
});

sketchfabSDK.Models.popular().then(function(response){
    console.log('\n\n\n\nPopular');
    console.log(response.results.map(function(result){
        return result.name + ' by ' + result.user.displayName;
    }));
});

sketchfabSDK.Models.staffpicks().then(function(response){
    console.log('\n\n\n\nStaffpicks');
    console.log(response.results.map(function(result){
        return result.name + ' by ' + result.user.displayName;
    }));
});

sketchfabSDK.Models.search('pokemon').then(function(response){
    console.log('\n\n\n\nSearch "pokemon"');
    console.log(response.results.map(function(result){
        return result.name + ' by ' + result.user.displayName;
    }));
});

sketchfabSDK.Models.byCategory('c92452986e70422ca2c6552835a89882').then(function(response){
    console.log('\n\n\n\nCategory c92452986e70422ca2c6552835a89882 (characters)');
    console.log(response.results.map(function(result){
        return result.name + ' by ' + result.user.displayName;
    }));
});

sketchfabSDK.Models.byTag('substance').then(function(response){
    console.log('\n\n\n\nTag "substance"');
    console.log(response.results.map(function(result){
        return result.name + ' by ' + result.user.displayName;
    }));
});

sketchfabSDK.Models.byUserId(116).then(function(response){
    console.log('\n\n\n\nbyUserId 116');
    console.log(response.results.map(function(result){
        return result.name + ' by ' + result.user.displayName;
    }));
});
