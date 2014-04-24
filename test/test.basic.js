'use strict'

var expect = require('chai').expect,
    Mitm = require('mongo-in-the-middle'),
    mware = require('../index');

var config = {
    db: 'mongodb://localhost:27017/nbdb',
    collection: 'articles'
}; 

suite('basic', function() {
    test('Basic object creation', function() {
        var app = new Mitm(config);
        expect(app).to.be.ok;
    });
});
