
import Torest from 'torest';
import User from '../model/User';
import Paper from '../model/Paper';
import Read from '../model/Read';

module.exports = function(app){
  Torest({
    model: User,
    app,
    routeName: '/user',
  });

  Torest({
    model: Paper,
    app,
    routeName: '/paper',
  });

  Torest({
    model: Read,
    app,
    routeName: '/read',
  });
};
