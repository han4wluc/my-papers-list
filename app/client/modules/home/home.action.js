
import { Utils, } from '../../';
const { axios } = Utils;

import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function searchPapers(keyword) {
  return async function(dispatch, getState){
    try {
      dispatch(showLoading());
      const regex = new RegExp(keyword,'i');
      const response = await axios.get('paper', {
        params: {
          where: {
            // $or: [{
              title: {
                $regex: keyword,
                $options : 'i',
              },
            // }, 
            // {
            //   abstract: {
            //     $regex: keyword,
            //     $options : 'i',
            //   },
            // }
            // ]
          },
        }
      });

      const papers = response.data;

      // const response2 = await axios.get('', {
      //   params: {
      //     where: {
      //       user: '',
      //       paper: {
      //         $in: papers.map(p=>p.id),
      //       }
      //     }
      //   }
      // });

      // const reads = response2.data;
      // const papersCell = papers.map((paper) => {
      //   let status = 'not_read';
      //   const read = _.find(reads, { paper: paper.id } )
      //   if(read){
      //     status = read.status;
      //   }
      //   return {
      //     paper,
      //     status,
      //   }
      // });

      // console.log({papers})
      dispatch({
        type: 'HOME_SET_STATE',
        props: {
          papers,
          searched: true,
        }
      });
    } catch (error){
      console.log(error);
      dispatch({
        type: 'NAV_SET_STATE',
        props: {
          errorMessage: 'Netowrk error, please retry',
        }
      });
    } finally {
      dispatch(hideLoading());
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
