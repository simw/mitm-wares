'use strict'

var expect = require('chai').expect,
    Mitm = require('mongo-in-the-middle'),
    mware = require('../index');

var config = {
    db: 'mongodb://localhost:27017/mongo-in-the-middle-tests',
    collection: 'testing'
};

suite('basic', function() {
    test('Basic object creation', function(done) {
        var app = new Mitm(config);
        expect(app).to.be.ok;

        for (var mw in mware) {
            expect(mw).to.exist;
            app.use(mw);
        }

        app.init(function() {
            done();
        });
    });  
  
    test('Insert, update, find and remove with middleware', function(done) {
        var app = new Mitm(config);
        for (var mw in mware) {
            if (typeof(mware[mw]) === "Function") {
                app.use(mware[mw]());
            } else {
                app.use(mware[mw]);
            }
        }
        app.init(function() {
            expect(app.testedInit).to.exist;

            var entry = {hello: "World"};
            app.insert(entry, function(err, doc) {
                expect(!err).to.be.ok;
                expect(doc[0]._id).to.exist;
                expect(app.testedInsertBefore).to.exist;
                expect(app.testedInsertAfter).to.exist;

                app.findById(doc[0]._id, function(err, items) {
                    expect(items).to.have.length(1);
                    expect(app.testedFindBefore).to.exist;
                    expect(app.testedFindAfter).to.exist;

                    app.remove(doc[0]._id, function(err, res) {
                        expect(!err).to.be.ok;
                        expect(res).to.equal(1);
                        expect(app.testedRemoveBefore).to.exist;
                        expect(app.testedRemoveAfter).to.exist;
                        done();
                    });
                });
            });
        });
    });


});
