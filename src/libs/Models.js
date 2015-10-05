'use strict';

var _ = {
    pick: require('lodash/object/pick'),
    defaults: require('lodash/object/defaults'),
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
    'folder': null, // folder id

    'sort_by': '-createdAt', // '-createdAt', '-viewCount', '-likeCount'
};

/** @namespace */
SketchfabSDK.Models = {

    /**
     * Get models by params
     * @param {object} [params] - Filtering and sorting parameters
     * @param {int} [params.count=24] - Number of results
     * @param {int} [params.offset] - Offset for pagination
     * @param {string} [params.sort_by='-createdAt'] - Sorting field ['-createdAt', '-viewCount', '-likeCount']
     *
     * @param {string} [params.search] - Search term
     * @param {string} [params.flag] - Flag: ['staffpicked']
     * @param {string} [params.categories] - Category id
     * @param {string} [params.tags] - Tags
     * @param {int} [params.date] - Filter on the last X days
     * @param {int} [params.face_count] - Filter on the number of faces
     * @param {string} [params.liked_by] - User id to get likes from
     * @param {string} [params.user] - User id to get models from
     * @param {string} [params.folder] - Folder id to get models from
     *
     * @return Promise
     */
    all: function(params) {

        // Fill in default values, remove unknown params
        params = _.pick(_.defaults(params, defaults), _.keys(defaults));

        return API.get(config.MODELS_ENDPOINT, params);
    },

    /**
     * Get recent models
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    recent: function(offset) {
        return SketchfabSDK.Models.all({
            offset: offset
        });
    },

    /**
     * Get popular models.
     * Models published during the last 7 days, sorted by views
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    popular: function(offset) {
        return SketchfabSDK.Models.all({
            date: 7,
            sort_by: '-viewCount',
            offset: offset
        });
    },

    /**
     * Get staffpicked models
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    staffpicks: function(offset) {
        return SketchfabSDK.Models.all({
            flag: 'staffpicked',
            offset: offset
        });
    },

    /**
     * Search for models
     * @param {string} query - Search term
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    search: function(query, offset) {
        return SketchfabSDK.Models.all({
            search: query,
            offset: offset
        });
    },

    /**
     * Get models for category
     * @param {string} categoryId - id of category
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    byCategory: function(categoryId, offset) {
        return SketchfabSDK.Models.all({
            categories: categoryId,
            offset: offset
        });
    },

    /**
     * Get models for tag
     * @param {string} tag - Tag slug
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    byTag: function(tag, offset) {
        return SketchfabSDK.Models.all({
            tags: tag,
            offset: offset
        });
    },

    /**
     * Get models for user
     * @param {string} userId - id of user
     * @param {int} [offset] - Pagination offset
     * @return Promise
     */
    byUserId: function(userId, offset) {
        return SketchfabSDK.Models.all({
            user: userId,
            offset: offset
        });
    }
};

module.exports = SketchfabSDK.Models;
