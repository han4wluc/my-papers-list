
import { Utils, } from '../../';
const { AV } = Utils;
import { browserHistory } from 'react-router';

export function login({username, password}) {
  return async function(dispatch, getState){
    try {
      const user = await AV.User.logIn('username', 'password');
      browserHistory.push('/home');
    } catch (error){
      console.log({error});
    }
  };
}
