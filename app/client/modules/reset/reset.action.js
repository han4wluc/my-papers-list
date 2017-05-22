
import { Utils, } from '../../';
const { axios } = Utils;
import { browserHistory } from 'react-router';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function reset({password1, password2, token}) {

  return async (dispatch, getState) => {

    if(password1 !== password2){
      dispatch({
        type: 'NAV_SET_STATE',
        props: {
          errorMessage: 'Passwords do not match',
        }
      });
      return;
    }
    dispatch({
      type: 'NAV_SET_STATE',
      props: {
        errorMessage: null,
      }
    });

    try {
      dispatch(showLoading());
      var token = location.search.match(/token=(\w*)/);
      if(token&&token[1]){
        token = token[1];
      }
      const { data } = await axios.post('/resetpassword', {
        password: password1,
        token,
      });

      if(data.code === 401){
        dispatch({
          type: 'NAV_SET_STATE',
          props: {
            errorMessage: 'Invalid Token',
          }
        });
        return;
      }

      dispatch({
        type: 'NAV_SET_STATE',
        props: {
          successMessage: 'Password Successfully Reset',
        }
      });

      setTimeout(function(){
        browserHistory.push('/login');
      },1000);

    } catch (error){
      console.log(error);
      dispatch({
        type: 'NAV_SET_STATE',
        props: {
          errorMessage: 'Network Error',
        }
      });
    } finally {
      dispatch(hideLoading());
    }

  };

}
