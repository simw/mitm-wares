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
            next();
        }
    }      
};

module.exports = exports = AddTime;
