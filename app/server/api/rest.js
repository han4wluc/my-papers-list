
import Torest from 'torest';
import User from '../model/User';
import Paper from '../model/Paper';
import Read from '../model/Read';

module.exports = function(app){
  Torest({
    model: User,
    app,
    routeName: '/api/v1/user',
  });

  Torest({
    model: Paper,
    app,
    routeName: '/api/v1/paper',
  });

  Torest({
    model: Read,
    app,
    routeName: '/api/v1/read',
  });
};
