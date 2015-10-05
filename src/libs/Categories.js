'use strict';

var API = require('./API');
var config = require('../config');

var SketchfabSDK = {};

/** @namespace */
SketchfabSDK.Categories = {

    /**
     * Get categories
     * @return Promise
     */
    all: function() {
        return API.get(config.CATEGORIES_ENDPOINT);
    }

};

module.exports = SketchfabSDK.Categories;
