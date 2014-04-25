'use strict'

var Tags = function(fieldName) {
    if (!fieldName) fieldName = 'tags';

    var result =  {
        init: function(fieldName, next) {
            this.tags = {};
            this.tags.fieldName = fieldName;

            var index = {};
            index[this.tags.fieldName] = 1;
            this.documents.ensureIndex(index, function(err) {
                if (err) {
                    throw new Error('Cannot create index on database for tags');
                }
                next();
            });

            this.findByTag = function(tag, query, fn) {
                if (!query) query = {}; 
                query[this.tags.fieldName] = tag;
                this.find(query, fn);
            };
        },

        find: {
            before: function(query, next) {
                next();    
            },

            after: function(items, next) {
                items.forEach(function(item) {
                    if (item[this.tags.fieldName]) {
                        item[this.tags.fieldName] = '' + item[this.tags.fieldName].join(' ');
                    }
                });
                next();
            }
        },

        update: {
            before: function(entry, next) {
                if (entry[this.tags.fieldName]) {
                    if (typeof entry[this.tags.fieldName] == 'string') {
                        entry[this.tags.fieldName] = entry[this.tags.fieldName].split(' ');
                    }

                    if (!Array.isArray(entry[this.tags.fieldName])) {
                        entry.tags = [entry[this.tags.fieldName]];
                    }
                }

                next();
            }
        }
    };

    result.insert = result.update;

    return result;
};

module.exports = exports = Tags;

