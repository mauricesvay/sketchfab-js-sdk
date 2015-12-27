var SketchfabSDK = require('../src/Sketchfab');

var sketchfabSDK = new SketchfabSDK();

sketchfabSDK.Users.all().then(function(response){
    console.log(response.results.map(function(result){
        return {
            username: result.username,
            profileUrl: result.profileUrl
        }
    }));
});

sketchfabSDK.Users.byId(116).then(function(response){
    console.log({
        username: response.username,
        profileUrl: response.profileUrl
    });
});

sketchfabSDK.Users.byUsername('alban').then(function(response){
    console.log({
        username: response.username,
        profileUrl: response.profileUrl
    });
});

sketchfabSDK.Users.byLocation('Paris').then(function(response){
    console.log(response.results.map(function(result){
        return {
            username: result.username,
            profileUrl: result.profileUrl,
            city: result.city,
            country: result.country
        }
    }));
});

sketchfabSDK.Users.bySkills('blender').then(function(response){
    console.log(response.results.map(function(result){
        return {
            username: result.username,
            profileUrl: result.profileUrl,
            skills: result.skills.map(function(skill){ return skill.name })
        }
    }));
});
