
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ReadSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  paper: {
    type: ObjectId,
    required: true,
    ref: 'Paper',
  },
  status: String,
}, {
  timestamps: true
});

ReadSchema.index({user: 1, paper: 1}, {unique: true});

module.exports = mongoose.model('Read', ReadSchema);
