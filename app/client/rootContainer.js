
import React, { Component } from 'react';
import Provider from './provider';
import App from './app';

export default class rootContainer extends Component {

  render(){
    return (
      <Provider>
        <App/>
      </Provider>  
    );
  }

}

