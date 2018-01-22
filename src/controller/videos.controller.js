var express = require('express');

var router = express.Router();

var Video    = require('./../model/video.model');
var Category = require('./../model/category.model');


router.route('/')
    .get(function(req, res) {

        Video.find(function (err, videos) {
            if(err) { return res.status(400).send(err) }
            
            res.render('video/index.html', {videos: videos});
        });
    })
    .post(function(req, res) {
        var video = new Video();

        video.videoId  = req.body.videoId;
        video.title    = req.body.title;
        video.category = req.body.category;
        video.thumbnailType = req.body.thumbnailType;
        video.laughing =  req.body.laughing;

        video.save(function(err, video) {
            if(err) { return res.status(400).send(err) }
            
            Category.update({_id: req.body.category }, {$push: { videos: video._id}}, function(err){

                return res.redirect("/videos");
            });
        });

    });


router.get('/new', function(req, res) {
    Category.find(function(err, categories) {
        if(err) { return res.status(400).send(err) }

        res.render('video/new.html', {categories: categories});
    });
    
});

router.put('/:id', function(req, res) {
    Video.findById(req.params.id, function(err, video){
        if(err) { return res.status(400).send(err) }

        var categoryId = video.category;

        video.videoId  = req.body.videoId;
        video.title    = req.body.title;
        video.category = req.body.category;
        video.thumbnailType = req.body.thumbnailType;
        video.laughing =  req.body.laughing;
        video.modified = Date.now();

        video.save(function(err, video) {
            if(err) { return res.status(400).send(err) }
            
            Category.update({_id: categoryId }, {$pull: { videos: video._id}}, function(err){

                Category.update({_id: req.body.category }, {$push: { videos: video._id}}, function(err){

                    return res.redirect("/videos");
                });
            });
        }); 
    });
});


router.get('/:id/edit', function(req, res) {
    Video.findById(req.params.id, function(err, video){
        if(err) { return res.status(400).send(err) }

        Category.find(function(err, categories) {
            if(err) { return res.status(400).send(err) }
    
            res.render('video/edit.html', {video: video, categories: categories});
        });
    })
    
});



module.exports = router;