
import Nightmare from 'nightmare';
import chai from'chai';
const should = chai.should();

import AV from 'leancloud-storage';
import axios from 'axios';

import * as Util from './util';

before(async function(done){
  const app = require('../app/server/config/express.js');

  app.mongoose.default.connection.once('open', async function(){
    try {
      await app.mongoose.default.models.Paper.insertMany(Util.genData());
      const query = new AV.Query('_User');
      await query.destroyAll();
      var user = new AV.User();
      user.setUsername('username');
      user.setPassword('password');
      user.setEmail('email2@email.com');
      await user.signUp();
      AV.User.logOut();
      done();
    } catch (error){
      done(error);
    }
  });

});

beforeEach(function(){
  AV.User.logOut();
});

after(async function(){
  const query = new AV.Query('_User');
  await query.destroyAll();
});

require('./home');
require('./login');
require('./signup');
