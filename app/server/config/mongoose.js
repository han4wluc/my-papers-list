
const mongoose = require('mongoose');
mongoose.connect('mongodb://mpl:afh111LqteEk77juxz7ipduMbMgq5RbqyWG8JXTBcBQ7DZA0941@47.52.57.206:27017/mpl');

mongoose.connection.once('open', () => {
  console.log('mongoose connection opened');
});
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', console.log);
