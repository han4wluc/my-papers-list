
import axios from 'axios';
import { Utils, } from '../../';
const { AV } = Utils;

export function getRead({status}) {
  const user = AV.User.current();
  const userId = user.id;

  return async function(dispatch, getState){
    try {
      const response = await axios.get('http://47.52.57.206:8000/read', {
        params: {
          query: {
            userId,
          },
          populate: ['paper']
        }
      });
      console.log(response.data);
      const read = response.data;
      // const read = response.data.map((d)=>{
      //   return {
      //     ...d,
      //     paper: d.paperId,
      //   };
      // });
      // console.log({read})
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
