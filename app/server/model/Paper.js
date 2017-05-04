
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
  categories: [String],
  pdfInfo: {
    text: String,
    pages: Number,
    ver: Number, // paper ver when the pdf was downloaded
    toolVer: Number, // version of the pdf tool
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Paper', PaperSchema);
