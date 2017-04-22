
import axios from 'axios';

export function getPaper(id) {
  return async function(dispatch, getState){
    try {
      const response = await axios.get('http://47.52.57.206:8000/paper/' + id);
      const paper = response.data;
      dispatch({
        type: 'DETAIL_SET_STATE',
        props: {
          paper,
          isLoading: false,
        }
      });
    } catch (error) {
      console.log({error});
    }
  };
}
