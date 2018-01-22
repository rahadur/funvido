var express = require('express');
var multer  = require('multer');
var path    = require('path');
var fs      = require('fs');
var crypto  = require('crypto');

var Video    = require('./../model/video.model');
var Category = require('./../model/category.model');

var storage = multer.diskStorage({
    destination: './s3',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
});
  
var upload = multer({ storage: storage });

var router = express.Router();


router.route('/')
    .get(function(req, res) {

        Category.find(function (err, categories) {
            if(err) { return res.status(400).send(err) }
            res.render('category/index.html', {categories: categories});
        });
    })
    .post(upload.single('thumbnail'), function(req, res) {
        var category = new Category();

        category.title      = req.body.title;
        category.details    = req.body.details;
        category.thumbnail  = req.file.path;

        category.save(function(err, video) {
            if(err) { return res.status(400).send(err) }
            
            return res.redirect("/categories");
        });

    });


router.get('/new', function(req, res) {
    res.render('category/new.html');
});


router.route('/:id')
    .put(upload.single('thumbnail'), function(req, res) {
        Category.findById(req.params.id, function(err, category) {
            category.title      = req.body.title;
            category.details    = req.body.details;
            
            if(req.file) {
                var thumbnail = category.thumbnail;

                category.thumbnail  = req.file.path;
                
                category.save(function(err, video) {
                    if(err) { return res.status(400).send(err) }

                    fs.unlink(thumbnail, function(err) {
                        return res.redirect("/categories");
                    });
                });

            } else {
                category.save(function(err, video) {
                    if(err) { return res.status(400).send(err) }

                    return res.redirect("/categories");
                });
            }

            
        });
    });


router.get('/:id/edit', function(req, res) {
    Category.findById(req.params.id, function(err, category) {
        if(err) { return res.status(400).send(err) }
        
        res.render('category/edit.html', { category: category });
    })
});



module.exports = router;