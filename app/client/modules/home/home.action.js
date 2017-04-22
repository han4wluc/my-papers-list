
import axios from 'axios';


export function searchPapers(keyword) {
  return async function(dispatch, getState){
    try {
      const regex = new RegExp(keyword,'i');
      const response = await axios.get('http://47.52.57.206:8000/paper', {
        params: {
          find: {
            $or: [{
              title: {
                $regex: keyword,
                $options : 'i',
              },
            }, {
              abstract: {
                $regex: keyword,
                $options : 'i',
              },
            }]
          },
        }
      });
      const papers = response.data;
      console.log({papers})
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

// export function onClickDetail(id){
//   return async function(dispatch, getState){
//     try {
//       const response = await axios.get('http://localhost:8000/paper/id');
//       const papers = response.data;
//       dispatch({
//         type: 'HOME_SET_STATE',
//         props: {
//           papers,
//         }
//       });
//     } catch (error){
//       console.log(error);
//     }
//   };
// }
