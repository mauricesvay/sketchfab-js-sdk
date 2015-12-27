'use strict';

var API = require('./API');
var config = require('../config');

/**
 * @namespace
 * @memberof SketchfabSDK
 */
function Categories(sdk) {
    this.sdk = sdk;
};

Categories.prototype = {

    /**
     * Get categories
     * @memberof SketchfabSDK.Categories#
     * @return Promise
     */
    all: function() {
        return API.get(config.CATEGORIES_ENDPOINT);
    }

};

module.exports = Categories;
