
import { Utils, } from '../../';
const { AV } = Utils;
import { browserHistory } from 'react-router';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function login({username, password}) {
  return async function(dispatch, getState){
    try {
      dispatch(showLoading());
      const user = await AV.User.logIn(username, password);
      browserHistory.push('/home');
    } catch (error){
      console.log({error});
      var errorMessage = 'Network Error';
      if(error.code === 211){
        errorMessage = 'Invalid username or password';
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
