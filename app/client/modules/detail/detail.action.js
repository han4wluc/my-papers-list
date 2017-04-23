
import axios from 'axios';
import { Utils, } from '../../';
const { AV } = Utils;

export function getPaper(id) {
  const user = AV.User.current();
  const userId = user.id;
  const paperId = id;
  console.log({userId,paperId});
  return async function(dispatch, getState){
    try {
      const response = await axios.get('http://47.52.57.206:8000/paper/' + id);
      const paper = response.data;

      const response2 = await axios.get('http://47.52.57.206:8000/read', {
        params: {
          find: {
            user: userId,
            paper: paperId,
          },
          limit: 1,
        }
      });

      var readStatus = 'not_read';
      if(response2.data.length === 1){
        readStatus = response2.data[0].status;
      }
      console.log('response2.data', response2.data);

      dispatch({
        type: 'DETAIL_SET_STATE',
        props: {
          paper,
          isLoading: false,
          readStatus,
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
      const response = await axios.put('http://47.52.57.206:8000/read', {
        query: {
          user: userId,
          paper: paperId,
        },
        body: {
          user: userId,
          paper: paperId,
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
