
import { Utils, } from '../../';
const { AV } = Utils;

export function logout({history}) {

  return async (dispatch, getState) => {
    AV.User.logOut();
    history.push('/');
  };

}
