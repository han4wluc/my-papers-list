
import { Utils, } from '../../';
const { AV, axios } = Utils;

export function getPaper(id) {
  return async function(dispatch, getState){
    try {
      const response = await axios.get('/paper/' + id);
      const paper = response.data;
      dispatch({
        type: 'DETAIL_SET_STATE',
        props: {
          paper,
          isLoading: false,
        }
      });


      const user = AV.User.current();
      if(!user){
        return;
      }
      const userId = user.id;
      const paperId = id;
      const response2 = await axios.get('/read', {
        params: {
          where: {
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

      dispatch({
        type: 'DETAIL_SET_STATE',
        props: {
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
      const response = await axios.put('/read', {
        where: {
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
