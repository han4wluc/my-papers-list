
const mongoose = require('mongoose');
mongoose.connect('mongodb://');

mongoose.connection.once('open', () => {
  console.log('mongoose connection opened');
});
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', console.log);
