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

    'location': null,
    'skills': null,
    'sort_by': '-followerCount' // '-followerCount', '-modelCount'
};

/**
 * @namespace
 * @memberof SketchfabSDK
 */
function Users(sdk) {
    this.sdk = sdk;
};

Users.prototype = {

    _getHeaders: function() {
        var headers = {};
        if (this.sdk.authentication && this.sdk.authentication.access_token) {
            headers['Authorization'] = 'Bearer ' + this.sdk.authentication.access_token;
        }
        return headers;
    },

    /**
     * Get user by OAuth token
     * @memberof SketchfabSDK.Users#
     * @return Promise
     */
    me: function() {
        return API.get('/v2/users/me', null, this._getHeaders());
    },

    /**
     * Get users by params
     * @memberof SketchfabSDK.Users#
     * @param {object} params - Filtering and sorting parameters
     *
     * @param {int} [params.count=24] - Number of results
     * @param {int} [params.offset] - Pagination offset
     * @param {string} [params.sort_by='-followerCount'] - Sorting field ['-followerCount', '-modelCount']
     *
     * @param {string} [params.location] - Location
     * @param {string} [params.skills] - Skills
     * @return Promise
     */
    all: function(params) {

        var queryParams = _.extend({}, defaults, params);
        queryParams = _.pick(queryParams, _.keys(defaults));
        return API.get(config.USERS_ENDPOINT, queryParams);
    },

    /**
     * Get user by id
     * @memberof SketchfabSDK.Users#
     * @param {string} id - User id
     * @return Promise
     */
    byId: function(id) {
        if (!id) {
            throw new Error('id parameter is missing');
        }
        return API.get(config.USERS_ENDPOINT + '/' + id);
    },

    /**
     * Get user by username. This method uses a private API. It might break in the future.
     * @memberof SketchfabSDK.Users#
     * @param {string} username - Username
     * @return Promise
     */
    byUsername: function(username) {
        console.warn('Users.byUsername is not a public API. It might break in the future.');
        return API.get('/i/users/@' + username);
    },

    /**
     * Get users by location
     * @memberof SketchfabSDK.Users#
     * @param {string} location - Location
     * @param {int} offset - Pagination offset
     * @return Promise
     */
    byLocation: function(location, offset) {
        return this.all({
            location: location,
            offset: offset
        });
    },

    /**
     * Get user by skills
     * @memberof SketchfabSDK.Users#
     * @param {string} skills - Skill
     * @param {int} offset - Pagination offset
     * @return Promise
     */
    bySkills: function(skills, offset) {
        return this.all({
            skills: skills,
            offset: offset
        });
    }
}

module.exports = Users;
