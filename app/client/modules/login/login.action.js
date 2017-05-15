
import { Utils, } from '../../';
const { AV } = Utils;
import { browserHistory } from 'react-router';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { Link } from 'react-router';

export function login({username, password}) {
  return async function(dispatch, getState){
    try {
      // await AV.User.requestPasswordReset('han4wluc@gmail.com');
      dispatch(showLoading());
      const user = await AV.User.logIn(username, password);
      browserHistory.push('/home');
    } catch (error){
      console.log({error});
      var errorMessage = 'Network Error';
      if(error.code === 210){
        errorMessage = 'Wront password';
      }
      if(error.code === 211){
        errorMessage = 'No such email registered';
      }
      if(error.code === 219){
        errorMessage = 'Too many failed attempts, please try again later';
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
