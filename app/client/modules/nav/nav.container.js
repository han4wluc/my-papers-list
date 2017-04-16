
import React, { Component } from 'react';
import * as navActions from './nav.action';
import { Utils, } from '../../';

const { Setup, AV } = Utils;

import { Link, browserHistory } from 'react-router';

class NavContainer extends Component {

  logout(){
    AV.User.logOut();
    browserHistory.push('/home');
  }

  renderButton(){
    return (
      <Link to="/login">
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
      </Link>
    );
  }

  renderUsername({username}){
    return (
      <div style={{color:'white'}}>
        {username}
        <button onClick={this.logout.bind(this)} className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
      </div>
    );
  }

  render(){

    const user = AV.User.current();
    let userComp = this.renderButton();
    if(user){
      userComp = this.renderUsername({username:user.getUsername()});
    }
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/home">
            <a className="navbar-brand" href="#">Fixed navbar</a>
          </Link>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/home">{'Home'}</Link>
                {/*<a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>*/}
              </li>

              <li className="nav-item">
                <Link to="/read">{'Read'}</Link>
                {/*<a className="nav-link" href="/read">Read</a>*/}
              </li>
            </ul>
            { userComp }
          </div>
        </nav>
        <br/>
        {this.props.children}
      </div>
    );
  }
}

export default Setup.customConnect('nav', navActions, NavContainer);
