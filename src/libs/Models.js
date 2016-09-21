'use strict';

var _ = {
    pick: require('lodash/object/pick'),
    extend: require('lodash/object/extend'),
    keys: require('lodash/object/keys')
};
var API = require('./API');
var config = require('../config');

var SketchfabSDK = {};

var defaults = {
    'count': 24,
    'offset': null,

    'search': null, // query

    'flag': null, // 'staffpicked'
    'categories': null, // category id
    'tags': null, // tag
    'date': null, // number of days
    'face_count': null,
    'liked_by': null, // user id
    'user': null, // user id
    'collection': null, // collection id

    'sort_by': '-publishedAt', // '-publishedAt', '-viewCount', '-likeCount', '-createdAt'
};

/**
 * @namespace
 * @memberof SketchfabSDK
 */
function Models(sdk) {
    this.sdk = sdk;
};

Models.prototype = {

    /**
     * Get models by params
     * @memberof SketchfabSDK.Models#
     * @param {object} [params] - Filtering and sorting parameters
     * @param {int} [params.count=24] - Number of results
     * @param {int} [params.offset] - Offset for pagination
     * @param {string} [params.sort_by='-publishedAt'] - Sorting field ['-publishedAt', '-createdAt', '-viewCount', '-likeCount', '-staffpickedAt']
     *
     * @param {string} [params.search] - Search term
     * @param {string} [params.flag] - Flag: ['staffpicked']
     * @param {string} [params.categories] - Category id
     * @param {string} [params.tags] - Tags
     * @param {int} [params.date] - Filter on the last X days
     * @param {int} [params.face_count] - Filter on the number of faces
     * @param {string} [params.liked_by] - User id to get likes from
     * @param {string} [params.user] - User id to get models from
     * @param {string} [params.collection] - Collection id to get models from
     *
     * @return Promise
     */
    all: function(params) {

        // Fill in default values
        var queryParams = _.extend({}, defaults, params);
        // Remove unknown params
        queryParams = _.pick(queryParams, _.keys(defaults));
        return API.get(config.MODELS_ENDPOINT, queryParams);
    },

    /**
     * Get recent models
     * @memberof SketchfabSDK.Models#
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    recent: function(offset) {
        return this.all({
            offset: offset
        });
    },

    /**
     * Get popular models.
     * @memberof SketchfabSDK.Models#
     * Models published during the last 7 days, sorted by views
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    popular: function(offset) {
        return this.all({
            date: 7,
            sort_by: '-likeCount',
            offset: offset
        });
    },

    /**
     * Get staffpicked models
     * @memberof SketchfabSDK.Models#
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    staffpicks: function(offset) {
        return this.all({
            flag: 'staffpicked',
            offset: offset,
            sort_by: '-staffpickedAt'
        });
    },

    /**
     * Search for models
     * @memberof SketchfabSDK.Models#
     * @param {string} query - Search term
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    search: function(query, offset) {
        return this.all({
            search: query,
            offset: offset
        });
    },

    /**
     * Get models for category
     * @memberof SketchfabSDK.Models#
     * @param {string} categoryId - id of category
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    byCategory: function(categoryId, offset) {
        return this.all({
            categories: categoryId,
            offset: offset
        });
    },

    /**
     * Get models for tag
     * @memberof SketchfabSDK.Models#
     * @param {string} tag - Tag slug
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    byTag: function(tag, offset) {
        return this.all({
            tags: tag,
            offset: offset
        });
    },

    /**
     * Get models for user
     * @memberof SketchfabSDK.Models#
     * @param {string} userId - id of user
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    byUserId: function(userId, offset) {
        return this.all({
            user: userId,
            offset: offset
        });
    }
};

module.exports = Models;
