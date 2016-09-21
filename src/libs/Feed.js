'use strict';

var _ = {
    pick: require('lodash/object/pick'),
    extend: require('lodash/object/extend'),
    keys: require('lodash/object/keys')
};
var API = require('./API');
var config = require('../config');

var defaults = {
    'count': 20,
    'offset': null,
};

/**
 * @namespace
 * @memberof SketchfabSDK
 */
function Feed(sdk) {
    this.sdk = sdk;
};

Feed.prototype = {

    _getHeaders: function() {
        var headers = {};
        if (this.sdk.authentication && this.sdk.authentication.access_token) {
            headers['Authorization'] = 'Bearer ' + this.sdk.authentication.access_token;
        }
        return headers;
    },

    /**
     * Get feed stories
     * @memberof SketchfabSDK.Feed#
     * @param {object} [params] - Pagination parameters
     * @param {int} [params.count=20] - Number of results
     * @param {int} [params.offset] - Offset for pagination
     *
     * @return Promise
     */
    all: function(params) {

        console.warn('Feed.all is not a public API. It might break in the future.');

        // Fill in default values, remove unknown params
        var queryParams = _.extend({}, defaults, params);
        queryParams = _.pick(queryParams, _.keys(defaults));

        return API.get(config.FEED_ENDPOINT, queryParams, this._getHeaders());
    },
};

module.exports = Feed;
