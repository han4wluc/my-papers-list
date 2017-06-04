
var mongoose;

const main = async function(){

  if(process.env.NODE_ENV === 'test'){
    var Mongoose = require('mongoose').Mongoose;
    mongoose = new Mongoose();
    mongoose.Promise = Promise;
    var Mockgoose = require('mockgoose').Mockgoose;
    var mockgoose = new Mockgoose(mongoose);

    await mockgoose.prepareStorage();
    mongoose.connect('mongodb://example.com/TestingDB');

  } else {
    mongoose = require('mongoose');
    mongoose.Promise = Promise;
    mongoose.connect('mongodb://mpl:afh111LqteEk77juxz7ipduMbMgq5RbqyWG8JXTBcBQ7DZA0941@47.52.57.206:27017/mpl');
  }

  mongoose.connection.once('open', () => {
    mongoose.connections.forEach((connection)=>{
      console.log('mongoose connected to:', connection.host, connection.name);
    });
  });
  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', console.log);

};

main();

export default mongoose;
