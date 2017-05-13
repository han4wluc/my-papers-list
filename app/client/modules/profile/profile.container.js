
import React, { Component } from 'react';
import * as profileActions from './profile.action';
import { Utils, } from '../../';

const { Setup } = Utils;

class ProfileContainer extends Component {
  render(){
    return (
      <div>{'Hello'}</div>
    );
  }
}

export default Setup.customConnect('profile', profileActions, ProfileContainer);
