
import axios from 'axios';
import { Utils, } from '../../';
const { AV } = Utils;

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

export function onClickStatusButton({status,paperId}){
  const user = AV.User.current();
  const userId = user.id;
  return async function(dispatch, getState){
    try {
      const response = await axios.put('http://47.52.57.206:8000/read/', {
        query: {
          userId,
          paperId,
        },
        body: {
          userId,
          paperId,
          status,
        }
      });
      // const paper = response.data;
      dispatch({
        type: 'DETAIL_SET_STATE',
        props: {
          readStatus: status,
        }
      });
    } catch (error) {
      console.log({error});
    }
  };
}
