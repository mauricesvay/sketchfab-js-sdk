'use strict';

var API = require('./API');
var config = require('../config');

var Sketchfab = {};

/** @namespace */
Sketchfab.Model = {

    /**
     * Get model by id
     * @param {string} id - Model id
     * @return Promise
     */
    byId: function(id) {
        return API.get(config.MODELS_ENDPOINT + '/' + id);
    },

    /**
     * Get annotations for model. This method uses a private API. It might break in the future.
     * @param {string} id - Model id
     * @return Promise
     */
    annotations: function(id) {
        console.warn('Model.annotations is not a public API. It might break in the future.');
        return API.get('/i/models/' + id + '/hotspots');
    },

    /**
     * Get textures for model. This method uses a private API. It might break in the future.
     * @param {string} id - Model id
     * @return Promise
     */
    textures: function(id) {
        console.warn('Model.textures is not a public API. It might break in the future.');
        return API.get('/i/models/' + id + '/textures');
    },

};

module.exports = Sketchfab.Model;
