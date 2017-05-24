
import React, { Component } from 'react';
import * as loginActions from './login.action';
import { Utils, } from '../../';
import { Link, Redirect } from 'react-router-dom';

const { Setup, AV } = Utils;


class LoginContainer extends Component {

  login(){
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const { login } = this.props.actions;
    login({username,password,history:this.props.history});
  }

  render(){
    console.log('aaaa')

    if(AV.User.current()){
      console.log('already logged in');
      return (
        <Redirect to={{
          pathname: '/',
          // state: { from: props.location }
        }}/>
      );
    }

    return (
      <div className="container">
        <h2> {'Login'} </h2>
        <div className="form">
          <input ref={"username"} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Username"/>
          <input ref={"password"} type="password" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Password"/>
          <br/>
          <div className="row">
            <div className="col-md-12">
              <Link to="/signup">
                <div>{'Click here to signup if you don\'t have an account'}</div>
              </Link>
            </div>
            <div className="col-md-12">
              <Link to="/reqpass">
                <div>{'Forgot Password?'}</div>
              </Link>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-12">
              <button onClick={this.login.bind(this)} type="submit" className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Setup.customConnect('login', loginActions, LoginContainer);
