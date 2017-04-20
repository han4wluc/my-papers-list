
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThingSchema = new Schema({
  text: String,
  index: Number,
  song: { type: Schema.Types.ObjectId, ref: 'Song'},
  lyric: { type: Schema.Types.ObjectId, ref: 'Lyric'},
  vocabs: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Vocab'}],
    default: [],
  },
});

module.exports = mongoose.model('Thing', ThingSchema);
