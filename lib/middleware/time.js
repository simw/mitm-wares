'use strict'

var AddTime = {
    insert: {
        before: function(entry, next) {
            var now = Date.now();
            entry.updateTime = now;
            entry.creationTime = now;
            next();
        }
    },

    update: {
        before: function(entry, next) {
            var now = Date.now();
            entry.updateTime = now;
            delete entry.creationTime;
            next();
        }
    },

    find: {
        after: function(docs, next) {
            docs.forEach(function(doc) {
                doc.creationTime = new Date(doc.creationTime).toUTCString();
                doc.updateTime = new Date(doc.updateTime).toUTCString();
            });
            next();
        }
    } 
};

module.exports = exports = AddTime;
