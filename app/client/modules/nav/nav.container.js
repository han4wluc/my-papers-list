
import React, { Component } from 'react';
import * as navActions from './nav.action';
import { Utils, } from '../../';
import LoadingBar from 'react-redux-loading-bar'

const { Setup, AV } = Utils;

import { Link, browserHistory } from 'react-router';

class NavContainer extends Component {

  logout(){
    AV.User.logOut();
    browserHistory.push('/home');
  }

  collapseNav(){
    $('#navbarCollapse').removeClass('show');
    browserHistory.push('/login');
  }

  renderButton(){
    return (
      <div className="mt-2 mt-md-0">
        <li className={'mr-sm-2 nav-item'}>
          <button onClick={this.collapseNav} className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
        </li>
      </div>
    );
  }

  renderUsername({username, pathname}){

    const active = pathname === '/profile' ? true : false;
    const color = active ? 'white' : '#ccc';

    return (
      <div className="form-inline mt-2 mt-md-0">
        <Link style={{color:color}} onClick={this.collapseNav} >{username}</Link>
        <li className={'mr-sm-2 nav-item'}>
          <button onClick={this.logout} className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
        </li>
      </div>
    );

  }

  renderError({errorMessage, dismissError}){
    if(!errorMessage){ return null; }
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          <button onClick={dismissError} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          { errorMessage }
        </div>
      </div>
    );
  }

  render(){

    const { errorMessage } = this.props.state;
    const { dismissError } = this.props.actions;

    const pathname = this.props.location.pathname;

    const user = AV.User.current();
    let userComp = this.renderButton();
    if(user){
      userComp = this.renderUsername({username:user.getUsername(),pathname});
    }
    return (
      <div>



        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/home">
            <a className="navbar-brand" href="#">MyPaperList</a>
          </Link>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className={'nav-item' + (pathname === '/home' ? ' active' : '')}>
                <Link className="nav-link" onClick={this.collapseNav} to="/home">{'Home'}</Link>
                {/*<a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>*/}
              </li>

              <li className={'nav-item' + (pathname === '/read' ? ' active' : '')}>
                <Link className="nav-link" onClick={this.collapseNav} to="/read">{'Read'}</Link>
                {/*<a className="nav-link" href="/read">Read</a>*/}
              </li>
            </ul>
            { userComp }
          </div>
        </nav>

        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          right: '0px',
          backgroundColor: '#292b2c',
          height: '3px',
        }}>
          <LoadingBar style={{ backgroundColor: '#0275d8', height: '3px' }} />
        </div>        
        <br/>

          { this.renderError({errorMessage,dismissError}) }

        <div style={{minHeight:'600px'}}>



          {this.props.children}



        </div>
        <hr/>

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
    );
  }
}

export default Setup.customConnect('nav', navActions, NavContainer);
