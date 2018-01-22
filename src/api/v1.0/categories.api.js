var express = require('express');

var router = express.Router();

var Video = require('./../../model/video.model');
var Category = require('./../../model/category.model');


router.route('/categories')
    .get(function(req, res) {
        Category.find(function( err, videos) {
            if(err) { return res.status(400).send(err) }
            return res.json(videos);
        });
    })
    /* .post(function(req, res) {
        
        var category = new Category();

        category.title   = req.body.title;
        category.details = req.body.title
        

        category.save(function(err, video) {
            if(err) { return res.status(400).send(err) }
            
            return  res.json(video);
        });

    }); */
    

router.get('/categories/:id/:limit/videos', function(req, res) {

    var limit = parseInt(req.params.limit) || 10;

    Category.findOne({_id: req.params.id})
        .populate('videos')
        .limit(limit)
        .exec(function (err, videos) {
        
        if(err) {
            return res.status(400).send(err);
        }
        
        return res.json(videos);
    });
});


module.exports = router;