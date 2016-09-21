var SketchfabSDK = require('../src/Sketchfab');

var sketchfabSDK = new SketchfabSDK();

sketchfabSDK.setAuthentication({
    access_token: "[ENTER YOU ACCESS TOKEN HERE]",
    expires_in: "36000",
    scope: "read+write",
    state: "1474489874378",
    token_type: "Bearer"
});

sketchfabSDK.Users.me().then(function(response) {
    console.log(response);
}).catch(function(response) {
    console.error(response.responseText);
});
