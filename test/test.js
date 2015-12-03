var assert = require('assert');
var SketchfabSDK = require('../src/Sketchfab');

describe('Models', function() {
    describe('#all()', function (done) {
        it('should return models', function () {
            SketchfabSDK.Models.all().then(function(err, data){
                if (err) throw err;
                done();
            });
        });
    });
});

describe('Model', function() {
    describe('#byId()', function (done) {
        it('should return model data for give id', function () {
            SketchfabSDK.Model.byId('7w7pAfrCfjovwykkEeRFLGw5SXS').then(function(err, data){
                if (err) throw err;
                done();
            });
        });
    });
});
