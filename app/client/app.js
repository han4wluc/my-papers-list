
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import store from './store';

import containers from './containers';
import { Utils } from './';
const { AV } = Utils;

import { Router, Route, IndexRoute, browserHistory, IndexRedirect, Redirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);
import { showLoading, hideLoading } from 'react-redux-loading-bar'

history.listen((location)=>{
  $('#navbarCollapse').removeClass('show');
  store.dispatch({
    type: 'NAV_SET_STATE',
    props: {
      errorMessage: null,
      successMessage: null,
    }
  });
  store.dispatch(hideLoading());
  $('body').scrollTop(0);
});

const loginRequired = function(nextState, replace, callback) {
  const user = AV.User.current();
  if(!user){
    // console.log('replace')
    replace({
      pathname: '/login',
    });
  }
  callback();
};

const alreadyLoggedIn = function(nextState, replace, callback) {
  const user = AV.User.current();
  if(user){
    replace({
      pathname: '/home',
    });
  }
  callback();
};
            // 

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={containers['nav']}>
            <IndexRedirect to="/search" />
            <Redirect from="home" to="search"/>
            {/*<IndexRedirect to="/detail/59071ee2e0450550d1170cf9" />*/}
            {/*routes*/}
            <Route path={'search'} component={containers['home']}/>
            <Route path={'detail/:id'} component={containers['detail']} />
            <Route path={'read'} component={containers['read']} onEnter={loginRequired}/>
            <Route path={'signup'} component={containers['signup']} onEnter={alreadyLoggedIn}/>
            <Route path={'login'} component={containers['login']} onEnter={alreadyLoggedIn}/>
            <Route path={'profile'} component={containers['profile']} onEnter={loginRequired}/>
            <Route path={'reset'} component={containers['reset']}/>
            <Route path={'reqpass'} component={containers['reqpass']}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

render(
  <App/>,
  document.getElementById('root')
);
