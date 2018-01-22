var mongoose = require('mongoose');
var random   = require('mongoose-random');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    title: { type: String, unique: true, require: true },
    details: String,
    thumbnail: String,
    videos: [ { type: Schema.Types.ObjectId, ref: 'Video'}],
    created: { type: Date, default: Date.now() },
    modified: { type: Date, default: Date.now() } 
});

categorySchema.plugin(random, { path: 'r'});


module.exports = mongoose.model('Category', categorySchema);