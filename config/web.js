var web = function(app) {
    app.use('/', require('./../src/controller/home.controller'));
    app.use('/videos', require('./../src/controller/videos.controller'));
    app.use('/categories', require('./../src/controller/categories.controller'));
}

module.exports = web;