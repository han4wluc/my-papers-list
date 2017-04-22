
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaperSchema = new Schema({
  id: String,
  title: String,
  abstract: String,
  authors: [String],
  published: Date,
  updated: Date,
  pdfLink: String,
});

module.exports = mongoose.model('Paper', PaperSchema);
