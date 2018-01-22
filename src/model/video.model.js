var mongoose = require('mongoose');
var random = require('mongoose-random');

var Schema = mongoose.Schema;



var videoSchema = new Schema({
    videoId: { type: String, unique: true, require: true },
    title: String,
    laughing: { type: Boolean, default: false },
    thumbnailType: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    viwes: { type: Number, default: 0},
    created: { type: Date, default: Date.now() },
    modified: { type: Date, default: Date.now() }
});

videoSchema.plugin(random, { path: 'r' });


module.exports = mongoose.model('Video', videoSchema);