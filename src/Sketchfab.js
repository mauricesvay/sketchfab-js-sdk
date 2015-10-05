var when = require('when');

var config = require('./config');
var utils = require('./utils');

var Categories = require('./libs/Categories');
var Models = require('./libs/Models');
var Model = require('./libs/Model');
var Users = require('./libs/Users');
var Feed = require('./libs/Feed');

/** @namespace */
var SketchfabSDK = {};

SketchfabSDK.appId = null;
SketchfabSDK.hostname = config.HOSTNAME;

/**
 * Initialize SDK. Only required for OAuth2.
 * @param {Object} params - Initialization parameters
 * @param {string} params.client_id - OAuth2 Client ID
 * @param {string} params.redirect_uri - OAuth2 Redirect URI
 * @param {string} [params.hostname] - Hostname
 */
SketchfabSDK.init = function(params) {
    SketchfabSDK.app_id = params.client_id;
    SketchfabSDK.redirect_uri = params.redirect_uri;

    if (params.hostname) {
        config.HOSTNAME = params.hostname;
    }
};

/**
 * Login with SketchfabSDK.
 * Browsers only.
 * @return Promise
 */
SketchfabSDK.connect = function() {

    return when.promise(function(resolve, reject) {

        if (!SketchfabSDK.app_id) {
            reject(new Error('App ID is missing. Call SketchfabSDK.init with your app ID first.'));
            return;
        }

        // @TODO: allow users to pass their own state
        var state = +(new Date());
        var authorizeUrl = [
            'https://' + config.HOSTNAME + '/oauth2/authorize/?',
            'state=' + state,
            '&response_type=token',
            '&client_id=' + SketchfabSDK.app_id
        ].join('');

        var loginPopup = window.open(authorizeUrl, 'loginWindow', 'width=640,height=400');

        // Polling new window
        var timer = setInterval(function() {
            try {
                var url = loginPopup.location.href;

                // User closed popup
                if (url === undefined) {
                    clearInterval(timer);
                    reject(new Error('Access denied (User closed popup)'));
                    return;
                }

                // User canceled or was denied access
                if (url.indexOf('?error=access_denied') !== -1) {
                    clearInterval(timer);
                    reject(new Error('Access denied (User canceled)'));
                    return;
                }

                // Worked?
                if (url.indexOf(SketchfabSDK.redirect_uri) !== -1) {
                    clearInterval(timer);

                    var hash = loginPopup.location.hash;
                    var grant;
                    var accessTokenRe = RegExp('access_token=([^&]+)');

                    if (hash.match(accessTokenRe)) {
                        grant = utils.parseQueryString(hash.substring(1));
                        resolve(grant);
                        return;
                    } else {
                        reject(new Error('Access denied (missing token)'));
                        return;
                    }
                }
            } catch (e) {}
        }, 1000);

    });
};

SketchfabSDK.Categories = Categories;
SketchfabSDK.Models = Models;
SketchfabSDK.Model = Model;
SketchfabSDK.Users = Users;
SketchfabSDK.Feed = Feed;

module.exports = SketchfabSDK;
