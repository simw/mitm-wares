'use strict'

var Slug = {
    insert: {
        before: function(entry, next) {
            if (entry.title) {
                entry.slug = slugify(entry.title);
            }
            next();
        }
    }
};

function slugify(str) {
    str = str.toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
    return str;
}

Slug.update = Slug.insert;

module.exports = exports = Slug;
