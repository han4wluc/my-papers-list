
// import axios from 'axios';
import { Utils, } from '../../';
const { AV, axios } = Utils;

export function getRead({status}) {
  const user = AV.User.current();
  const userId = user.id;

  return async function(dispatch, getState){
    try {
      dispatch({
        type: 'READ_SET_STATE',
        props: {
          isLoading: true,
          readStatus: status,
        }
      });
      const response = await axios.get('read', {
        params: {
          where: {
            user: userId,
            status,
          },
          populate: ['paper']
        }
      });
      const read = response.data;
      dispatch({
        type: 'READ_SET_STATE',
        props: {
          read,
          isLoading: false,
        }
      });
    } catch (error) {
      console.log({error});
    }
  };
}
