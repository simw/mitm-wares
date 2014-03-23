'use strict'

var Tags = {
    init: function(next) {
        this.documents.ensureIndex({tags: 1}, function(err) {
            if (err) {

            }
            next();
        });

        this.findByTag = function(tag, fn) {
            var query = {tags: tag};
            this.find(query, fn);
        };
    },

    find: {
        before: function(query, next) {
            next();    
        },

        after: function(items, next) {
            items.forEach(function(item) {
                if (item.tags) {
                    item.tags = '' + item.tags.join(',');
                }
            });
            next();
        }
    },

    update: {
        before: function(entry, next) {
            if (entry.tags) {
                if (typeof entry.tags == 'string') {
                    entry.tags = entry.tags.split(' ');
                }

                if (!Array.isArray(entry.tags)) {
                    entry.tags = [entry.tags];
                }
            }

            next();
        }
    }
};

Tags.insert = Tags.update;

module.exports = exports = Tags;
