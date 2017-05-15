
import { Utils, } from '../../';
import { browserHistory } from 'react-router';
const { AV } = Utils;

export function logout() {

  return async (dispatch, getState) => {
    AV.User.logOut();
    browserHistory.push('/home');
  };

}
