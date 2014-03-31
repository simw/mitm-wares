'use strict'

var fs = require('fs'),
    path = require('path');

module.exports = app = {};

fs.readDirSync(__dirname + '/middleware').forEach(function(filename) {
    if (!/\.js$/.test(filename)) return;

    var name = path.basename(filename, '.js');    
    app[name] = require('./middleware/' + name);
});

//app.time = require('./middleware/time');
//app.slug = require('./middleware/slug');
//app.tagging = require('./middleware/tags');
