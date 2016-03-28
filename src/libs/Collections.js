'use strict';

var _ = {
    pick: require('lodash/object/pick'),
    extend: require('lodash/object/extend'),
    keys: require('lodash/object/keys')
};
var API = require('./API');
var config = require('../config');

var defaults = {
    'count': 24,
    'offset': null,
    'sort_by': '-subscriberCount',
    'user': null,
};

/**
 * @namespace
 * @memberof SketchfabSDK
 */
function Collections(sdk) {
    this.sdk = sdk;
};

Collections.prototype = {

    /**
     * Get models by params
     * @memberof SketchfabSDK.Collections#
     * @param {object} [params] - Filtering and sorting parameters
     * @param {int} [params.count=24] - Number of results
     * @param {int} [params.offset] - Offset for pagination
     * @param {string} [params.sort_by='-subscriberCount'] - Sorting field ['-subscriberCount', '-createdAt']
     *
     * @param {string} [params.user] - User id to get collections from
     *
     * @return Promise
     */
    all: function(params) {

        // Fill in default values
        var queryParams = _.extend({}, defaults, params);
        // Remove unknown params
        queryParams = _.pick(queryParams, _.keys(defaults));
        return API.get(config.COLLECTIONS_ENDPOINT, queryParams);
    },
}

module.exports = Collections;
