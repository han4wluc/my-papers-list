
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducers from './reducers';
import { loadingBarReducer, loadingBarMiddleware } from 'react-redux-loading-bar';

// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const reducer = combineReducers({
  ...reducers,
  // routing: routerReducer,
  loadingBar: loadingBarReducer,
});


// try {
//   console.log('window3', !!window);
//   store = createStore(
//     reducer,
//     window.__INITIAL_STATE__,
//     applyMiddleware(thunk),
//   );
//   console.log('store state', store.getState());
// } catch (error){
//   console.log(error);
//   store = createStore(
//     reducer,
//     applyMiddleware(thunk),
//   );
// }

export default function(){
  var store;
  try {
    // console.log('window3', !!window);
    store = createStore(
      reducer,
      window.__INITIAL_STATE__,
      applyMiddleware(thunk),
    );
    // console.log('store state', store.getState());
  } catch (error){
    // console.log(error);
    store = createStore(
      reducer,
      applyMiddleware(thunk),
    );
  }
  return store;
}

