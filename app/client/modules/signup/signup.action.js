
import { Utils, } from '../../';
const { AV, } = Utils;
import { browserHistory } from 'react-router';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function signup({username, email, password}) {

  return async function(dispatch, getState){
    const user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);
    try {
      dispatch(showLoading());
      await user.signUp();
      browserHistory.push('/home');
    } catch (error){
      console.log({error});
      var errorMessage = 'Network Error';
      if(error.code === 125){
        errorMessage = 'The email address was invalid';
      }
      if(error.code === 202){
        errorMessage = 'Username already in use';
      }
      if(error.code === 203){
        errorMessage = 'Email already used';
      }
      dispatch({
        type: 'NAV_SET_STATE',
        props: {
          errorMessage,
        }
      });
    } finally {
      dispatch(hideLoading());
    }
  };

}
