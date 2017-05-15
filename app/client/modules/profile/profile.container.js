
import React, { Component } from 'react';
import * as profileActions from './profile.action';
import { Utils, } from '../../';
import { Link } from 'react-router';
const { Setup, AV } = Utils;

class ProfileContainer extends Component {
  render(){
    const user = AV.User.current();
    const { logout } = this.props.actions;

    return (
      <div className="container">
        <h4>{'Username'}</h4>
        <p>{user.get('username')}</p>
        <h4>{'Email'}</h4>
        <p>{user.get('email')}</p>

        <div className="row">
          <div className="col-md-12">
            <Link to="/signup">
              <div>{'Change Password'}</div>
            </Link>
          </div>
        </div>
        <br/>
        <button onClick={logout} type="submit" className="btn btn-danger">Logout</button>
      </div>
    );
  }
}

export default Setup.customConnect('profile', profileActions, ProfileContainer);
