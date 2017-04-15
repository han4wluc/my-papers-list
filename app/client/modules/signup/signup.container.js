
import React, { Component } from 'react';
import * as signupActions from './signup.action';
import { Utils, } from '../../';
import { Link } from 'react-router';

const { Setup } = Utils;

class SignupContainer extends Component {

  signup(){
    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log({username,email,password});
    const { signup } = this.props.actions;
    signup({username,email,password});
  }

  render(){
    return (
      <div className="container">

        <h2> {'Signup'} </h2>

        <div className="form-inline">

          <input ref={"username"} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Username"/>

          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <input ref={"email"} type="email" className="form-control" id="inlineFormInputGroup" placeholder="E-mail"></input>
          </div>

          <input ref={"password"} type="password" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Password"/>

          <div className="row">
            <div className="col-md-12">
              <Link to="/login">
                <div>{'Login'}</div>
              </Link>
            </div>
            <div className="col-md-12">
              <button onClick={this.signup.bind(this)} type="submit" className="btn btn-primary">{'Signup'}</button>
             </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Setup.customConnect('signup', signupActions, SignupContainer);
