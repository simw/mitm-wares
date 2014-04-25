'use strict'

var SampleMiddleware = {
    init: function(next) {
        this.testedInit = 1;
        next();
    },

    find: {
        before: function(query, next) {
            this.testedFindBefore = 1;
            next();
        },
        after: function(docs, next) {
            this.testedFindAfter = 1;
            next();
        }
    },

    insert: {
        before: function(entry, next) {
            this.testedInsertBefore = 1;
            next();
        },
        after: function(doc, next) {
            this.testedInsertAfter = 1;
            next();
        }
    },

    update: {
        before: function(entry, next) {
            this.testedUpdateBefore = 1;
            next();
        },
        after: function(doc, next) {
            this.testedUpdateAfter = 1;
            next();
        }
    },

    remove: {
        before: function(id, next) {
            this.testedRemoveBefore = 1;
            next();
        },
        after: function(res, next) {
            this.testedRemoveAfter = 1;
            next();
        }
    } 
};

module.exports = exports = SampleMiddleware;
