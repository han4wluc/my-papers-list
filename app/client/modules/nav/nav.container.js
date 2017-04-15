
import React, { Component } from 'react';
import * as navActions from './nav.action';
import { Utils, } from '../../';

const { Setup, AV } = Utils;

// import { Link } from 'react-router';
import { Link, browserHistory } from 'react-router';
        // <Link to="/home">{'Home'}</Link>

class NavContainer extends Component {
  render(){

    console.log('AV', AV);

    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">Fixed navbar</a>
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
            <form className="form-inline mt-2 mt-md-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <br/>
        {this.props.children}
      </div>
    );
  }
}

export default Setup.customConnect('nav', navActions, NavContainer);
