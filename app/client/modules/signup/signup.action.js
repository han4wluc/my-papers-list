
import { Utils, } from '../../';
const { AV } = Utils;
import { browserHistory } from 'react-router';

export function signup({username, email, password}) {

  return async function(dispatch, getState){
    const user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);
    try {
      await user.signUp();
      browserHistory.push('/home');
    } catch (error){
      console.log({error});
    }
  };

}
