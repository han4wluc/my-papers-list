
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import store from './store';

import containers from './containers';

import { Router, Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {

  render() {
    const moduleNames = Object.keys(containers).filter((n)=>n !== 'nav');
    const routes = moduleNames.map((moduleName, i)=>{
      return (
        <Route key={i} path={moduleName} component={containers[moduleName]}/>
      );
    });
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={containers['nav']}>
            <IndexRedirect to="/login" />
            {routes}
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
