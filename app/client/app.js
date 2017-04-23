
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import store from './store';

import containers from './containers';
import { Utils } from './';
const { AV } = Utils;

import { Router, Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);


const loginRequired = function(nextState, replace, callback) {
  const user = AV.User.current();
  if(!user){
    console.log('replace')
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

class App extends Component {

  render() {
    // const moduleNames = Object.keys(containers).filter((n)=>n !== 'nav');
    // const routes = moduleNames.map((moduleName, i)=>{
    //   return (
    //     <Route key={i} path={moduleName} component={containers[moduleName]}/>
    //   );
    // });
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={containers['nav']}>
            <IndexRedirect to="/home" />
            {/*routes*/}
            <Route path={'home'} component={containers['home']}/>
            <Route path={'detail/:id'} component={containers['detail']} />
            <Route path={'read'} component={containers['read']} onEnter={loginRequired}/>
            <Route path={'signup'} component={containers['signup']}/>
            <Route path={'login'} component={containers['login']} onEnter={alreadyLoggedIn}/>
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
