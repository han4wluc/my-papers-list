
import React, { Component } from 'react';
import * as reqpassActions from './reqpass.action';
import { Utils, } from '../../';

const { Setup } = Utils;

class ReqpassContainer extends Component {

  submit({request}){
    const email = this.refs.email.value;
    // console.log(email);
    request({email, history: this.props.history});
  }

  render(){

    const { request } = this.props.actions;

    return (
      <div className="container">

        <h2> {'Request reset password'} </h2>
          <div className="row form-group">
            <label className="col-sm-12 control-label" for="inputPassword">{'Email Address'}</label>
            <div className="col-sm-6">
              <input ref="email" type="text" id="email" className="form-control" placeholder="Email" name="email" required></input>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-12">
              <button onClick={this.submit.bind(this, {request})} type="submit" className="btn btn-primary">{'Request'}</button>
            </div>
          </div>
      </div>
    );
  }
}

export default Setup.customConnect('reqpass', reqpassActions, ReqpassContainer);
