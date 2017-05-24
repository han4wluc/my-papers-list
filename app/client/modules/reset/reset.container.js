
import React, { Component } from 'react';
import * as resetActions from './reset.action';
import { Utils, } from '../../';

const { Setup } = Utils;

class ResetContainer extends Component {

  onClick({reset}) {
    const password1 = this.refs.password1.value;
    const password2 = this.refs.password2.value;
    // console.log(password1, password2);

    var token = location.search.match(/token=(\w*)/);
    if(token&&token[1]){
      token = token[1];
    }

    reset({password1, password2, token, history: this.props.history});
  }

  render(){

    const { reset } = this.props.actions;

    return (
      <div className="container">
        <h3>{'Reset Password'}</h3>      
        <form className="form-horizontal form login-form" name="resetform">
          <div className="form-group">
            <label className="col-sm-4 control-label">{'New Password'}</label>
            <div className="col-sm-6">
              <input ref="password1" type="password" id="inputEmail" className="form-control" placeholder="New Password" name="password1" required></input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-4 control-label" for="inputPassword">{'Confirm Password'}</label>
            <div className="col-sm-6">
              <input ref="password2" type="password" id="inputPassword" className="form-control" placeholder="New Password" name="password2" required></input>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-4">
              <button onClick={this.onClick.bind(this, {reset})} type="button" className="btn btn-primary" id="reset">{'Reset'}</button>
            </div>
          </div>

        </form>
      </div>

    );
  }
}

export default Setup.customConnect('reset', resetActions, ResetContainer);
