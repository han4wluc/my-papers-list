
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';

export default class MyProvider extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          { this.props.children }
        </BrowserRouter>
      </Provider>
    );
  }
}
