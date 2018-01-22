var api = function(app) {

    app.use('/api/v1.0', require('./../src/api/v1.0/videos.api'));
    app.use('/api/v1.0', require('./../src/api/v1.0/categories.api'));
}


module.exports = api;