
import axios from 'axios';

export function getPapers({status}) {
  return async function(dispatch, getState){
    try {
      const response = await axios.get('http://47.52.57.206:8000/paper');
      const papers = response.data;
      dispatch({
        type: 'READ_SET_STATE',
        props: {
          papers,
          isLoading: false,
        }
      });
    } catch (error) {
      console.log({error});
    }
  };
}
