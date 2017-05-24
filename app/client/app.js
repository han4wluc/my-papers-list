
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';

import containers from './containers';
import { Utils } from './';
const { AV } = Utils;

// import { Router, Route, IndexRoute, BrowserRouter, IndexRedirect, Redirect } from 'react-router';
import { BrowserRouter, Link, IndexRedirect, Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router';

// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// const history = syncHistoryWithStore(browserHistory, store);
import { showLoading, hideLoading } from 'react-redux-loading-bar';

// history.listen((location)=>{
//   $('#navbarCollapse').removeClass('show');
//   store.dispatch({
//     type: 'NAV_SET_STATE',
//     props: {
//       errorMessage: null,
//       successMessage: null,
//     }
//   });
//   store.dispatch(hideLoading());
//   $('body').scrollTop(0);
// });

// const loginRequired = function(nextState, replace, callback) {
//   const user = AV.User.current();
//   if(!user){
//     // console.log('replace')
//     replace({
//       pathname: '/login',
//     });
//   }
//   callback();
// };

// const alreadyLoggedIn = function(nextState, replace, callback) {
//   const user = AV.User.current();
//   if(user){
//     replace({
//       pathname: '/home',
//     });
//   }
//   callback();
// };

const Nav = containers['nav'];

const loginRequired = function(Comp){
  if(!AV.User.current()){
    return (
      <Redirect to={{
        pathname: '/',
      }}/>
    );
  }
  return (<Comp/>);
};

const cantBeLoggedIn = function(Comp) {
  const user = AV.User.current();
  if(user){
    return (
      <Redirect to={{
        pathname: '/',
      }}/>
    );
  }
  return (<Comp/>);
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Nav/>

            <div style={{minHeight:'600px'}}>
               <div className="content">
                 <Switch>
                    <Route exact path='/' component={containers['home']} />
                    <Route path={'/detail/:id'} component={containers['detail']} />
                    <Route path={'/read'} render={()=>loginRequired(containers['read'])} />
                    <Route path={'/signup'} render={()=>cantBeLoggedIn(containers['signup'])} />
                    <Route path={'/login'} render={()=>cantBeLoggedIn(containers['login'])} />
                    <Route path={'/profile'} render={()=>loginRequired(containers['profile'])}/>
                    <Route path={'/reset'} component={containers['reset']}/>
                    <Route path={'/reqpass'} component={containers['reqpass']}/>
                 </Switch>
               </div>
            </div>

            <footer className="bd-footer text-muted">
              <div className="container">
                {/*<div className="bd-footer-links" style={{display:'flex',flex:1,flexDirection:'rows',marginBottom:'12px'}}>
                  <div style={{marginRight:'16px'}}><a href="https://github.com/twbs/bootstrap">GitHub</a></div>
                  <div style={{marginRight:'16px'}}><a href="https://twitter.com/getbootstrap">Twitter</a></div>
                  <div style={{marginRight:'16px'}}><a href="/examples/">Examples</a></div>
                  <div><a href="/about/history/">About</a></div>
                </div>
                <p>Designed and built with all the love in the world by <a href="https://twitter.com/mdo" target="_blank">@mdo</a> </p>
                */}<p> MyPaperList </p>
              </div>
            </footer>

           </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

// render(
//   <App/>,
//   document.getElementById('root')
// );
