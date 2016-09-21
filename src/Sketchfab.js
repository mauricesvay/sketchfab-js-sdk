var when = require('when');
var _ = {
    defaults: require('lodash/object/defaults'),
};

var config = require('./config');
var utils = require('./utils');

var resources = {
    'Categories': require('./libs/Categories'),
    'Collections': require('./libs/Collections'),
    'Models': require('./libs/Models'),
    'Model': require('./libs/Model'),
    'Users': require('./libs/Users'),
    'Feed': require('./libs/Feed')
}

/** @namespace */
function SketchfabSDK(options) {
    var defaults = {
        client_id: null,
        redirect_uri: null,
        hostname: config.HOSTNAME,
        authentication: null
    };

    this.options = _.defaults({}, options, defaults);
    this._setupResources();
}

SketchfabSDK.prototype = {

    /**
     * Login with SketchfabSDK.
     * Browsers only.
     * @return Promise
     */
    connect: function() {
        return when.promise(function(resolve, reject) {
            if (!this.options.client_id) {
                reject(new Error('client_id is missing.'));
                return;
            }

            // @TODO: allow users to pass their own state
            var state = +(new Date());
            var authorizeUrl = [
                'https://' + this.options.hostname + '/oauth2/authorize/?',
                'state=' + state,
                '&response_type=token',
                '&client_id=' + this.options.client_id
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
                    if (url.indexOf(this.options.redirect_uri) !== -1) {
                        clearInterval(timer);

                        var hash = loginPopup.location.hash;
                        var grant;
                        var accessTokenRe = RegExp('access_token=([^&]+)');

                        if (hash.match(accessTokenRe)) {
                            grant = utils.parseQueryString(hash.substring(1));
                            this.setAuthentication(grant);
                            resolve(grant);
                            return;
                        } else {
                            reject(new Error('Access denied (missing token)'));
                            return;
                        }
                    }
                } catch (e) {}
            }.bind(this), 1000);

        }.bind(this));
    },

    setAuthentication: function(grant) {
        this.authentication = grant;
    },

    _setupResources: function() {
        for (var name in resources) {
            this[name] = new resources[name](this);
        }
    }
};

module.exports = SketchfabSDK;
