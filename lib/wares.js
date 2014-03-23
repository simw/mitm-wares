module.exports = app = {};

app.time = require('./middleware/time');
app.slug = require('./middleware/slug');
app.tagging = require('./middleware/tags');
