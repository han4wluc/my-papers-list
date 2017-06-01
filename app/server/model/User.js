
// var mongoose = require('mongoose');
import mongoose from '../config/mongoose';

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  email: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
