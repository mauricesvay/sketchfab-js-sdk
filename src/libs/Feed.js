'use strict';

var _ = {
    pick: require('lodash/object/pick'),
    defaults: require('lodash/object/defaults'),
    keys: require('lodash/object/keys')
};
var API = require('./API');
var config = require('../config');

var Sketchfab = {};

var defaults = {
    'count': 20,
    'offset': null,
};

/** @namespace */
Sketchfab.Feed = {

    /**
     * Get feed stories
     * @param {object} token - OAuth2 access token
     * @param {object} [params] - Filtering and sorting parameters
     * @param {int} [params.count=20] - Number of results
     * @param {int} [params.offset] - Offset for pagination
     *
     * @return Promise
     */
    items: function(token, params) {

        var headers = {};
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        } else {
            throw new Error('OAuth2 access token is missing');
        }

        // Fill in default values, remove unknown params
        params = _.pick(_.defaults(params, defaults), _.keys(defaults));

        return API.get(config.FEED_ENDPOINT, params, headers);
    },
};

module.exports = Sketchfab.Feed;
