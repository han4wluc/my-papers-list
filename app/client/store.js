
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
const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;

