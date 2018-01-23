var express = require('express');

var router = express.Router();

var Video = require('./../../model/video.model');
var Category = require('./../../model/category.model');


router.route('/videos')
    .get(function(req, res) {
        Video.find()
        .populate('category')
        .exec(function( err, videos) {
            if(err) { return res.status(400).send(err) }
            return res.json(videos);
        });
    });
    /* .post(function(req, res) {
        var video = new Video();

        video.videoId   = req.body.videoId;
        video.title     = req.body.title
        video.category  = req.body.category;

        video.save(function(err, video) {
            if(err) { return res.status(400).send(err) }
            
            Category.update({_id: req.body.category }, {$push: { videos: video._id}}, function(err){

                return  res.json(video);
            })
        });

    }); */

    
router.route('/videos/:id')
    .patch(function(req, res){
        Video.update({_id: req.params.id}, { $inc: { viwes: 1 }}, function(err) {
            return res.json({message: 'video view'});
        });
    });

router.get('/videos/:limit', function(req, res) {


    var limit = parseInt(req.params.limit) || 10;

    Video.findRandom().limit(limit).exec(function (err, videos) {
        
        if(err) {
            return res.status(400).send(err);
        }
        
        return res.json(videos);
    });
});


router.get('/videos/:limit/laughing', function(req, res) {


    var limit = parseInt(req.params.limit) || 10;

    Video.findRandom({laughing: true}).limit(limit).exec(function (err, videos) {
        
        if(err) {
            return res.status(400).send(err);
        }
        
        return res.json(videos);
    });
});



router.get('/videos/:title/search', function(req, res) {

    var title = req.params.title;

    Video.find({ $text: { $search: title,  $caseSensitive: false }}, function(err, videos) {
        if(err) {
            return res.status(400).send(err);
        }

        return res.json(videos);
    });
});


router.get('/videos/:title/search/:limit', function(req, res) {

    var title = req.params.title;
    var limit = parseInt(req.params.limit) || 10;

    Video.find({ $text: { $search: title,  $caseSensitive: false }})
        .limit(limit)
        .exec(function(err, videos) {
            if(err) {
                return res.status(400).send(err);
            }
    
            return res.json(videos);
        });
});

module.exports = router;