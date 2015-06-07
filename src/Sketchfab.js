var q = require('q');

var Categories = require('./libs/Categories');
var Models = require('./libs/Models');
var Model = require('./libs/Model');
var Users = require('./libs/Users');

/** @namespace */
var Sketchfab = {};

Sketchfab.appId = null;

/**
 * Initialize SDK. Only required for OAuth2.
 * @param {Object} params - Initialization parameters
 * @param {string} params.client_id - OAuth2 Client ID
 * @param {string} params.redirect_uri - OAuth2 Redirect URI
 */
Sketchfab.init = function(params) {
    Sketchfab.app_id = params.client_id;
    Sketchfab.redirect_uri = params.redirect_uri;
};

/**
 * Login with Sketchfab.
 * Browsers only.
 * @return Promise
 */
Sketchfab.connect = function() {

    var deferred = q.defer();

    if (!Sketchfab.app_id) {
        console.error("App ID is missing. Call Sketchfab.init with your app ID first.");
    }

    var state = +(new Date());
    var authorizeUrl = [
        'https://sketchfab.com/oauth2/authorize/?',
        'state=' + state,
        '&response_type=token',
        '&client_id=' + Sketchfab.app_id
    ].join('');

    var loginPopup = window.open(authorizeUrl, 'loginWindow', 'width=640,height=400');

    // Polling new window
    var timer = setInterval(function() {
        try {
            var url = loginPopup.location.href;

            // User closed popup
            if (url === undefined) {
                clearInterval(timer);
                deferred.reject(new Error('Access denied (User closed popup)'));
                return;
            }

            // User canceled or was denied access
            if (url.indexOf('?error=access_denied') !== -1) {
                clearInterval(timer);
                deferred.reject(new Error('Access denied (User canceled)'));
                return;
            }

            // Worked?
            if (url.indexOf(Sketchfab.redirect_uri) !== -1) {
                clearInterval(timer);

                var hash = loginPopup.location.hash;
                var accessTokenRe = RegExp('#access_token=([^&]+)&(.+)');
                var accessToken = accessTokenRe.exec(hash)[1];

                if (accessToken) {
                    Sketchfab.accessToken = accessToken;
                    deferred.resolve(Sketchfab.accessToken);
                } else {
                    deferred.reject(new Error('Access denied (missing token)'));
                }
            }
        } catch (e) {}
    }, 1000);

    return deferred.promise;
};

Sketchfab.Categories = Categories;
Sketchfab.Models = Models;
Sketchfab.Model = Model;
Sketchfab.Users = Users;

module.exports = Sketchfab;
