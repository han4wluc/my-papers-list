
import { Utils, } from '../../';
const { AV } = Utils;
import { showLoading, hideLoading } from 'react-redux-loading-bar';


export function request({email, history}) {
  return async (dispatch, getState) => {

    try {
      dispatch(showLoading());
      const res = await AV.User.requestPasswordReset(email);
      console.log(res)
      dispatch({
        type: 'NAV_SET_STATE',
        props: {
          successMessage: `Reset password email has been sent to ${email}`,
          errorMessage: null,
        }
      });
      setTimeout(function(){
        history.push('/login');
      },1000);
    } catch (error) {
      console.log(error);
      var errorMessage = 'Network Error';
      if(error.code === 205){
        errorMessage = 'No user with this email address';
      }
      if(error.code === 1){
        errorMessage = 'Reset password has been requested too many times. Please try again later.';
      }
      dispatch({
        type: 'NAV_SET_STATE',
        props: {
          successMessage: null,
          errorMessage,
        }
      });
    } finally {
      dispatch(hideLoading());
    }

  };
}
