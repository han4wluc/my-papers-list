
import axios from 'axios';

export function searchPapers(keyword) {
  return async function(dispatch, getState){
    try {
      const response = await axios.get('http://localhost:8000/search/' + keyword);
      const papers = response.data;
      dispatch({
        type: 'HOME_SET_STATE',
        props: {
          papers,
        }
      });
    } catch (error){
      console.log(error);
    }
  };
}
