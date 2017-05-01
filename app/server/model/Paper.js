
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaperSchema = new Schema({
  arxivId: String,
  ver: Number,
  abs: String,
  pdf: String,
  title: String,
  summary: String,
  authors: [String],
  published: Date,
  updated: Date,
  categories: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Paper', PaperSchema);
