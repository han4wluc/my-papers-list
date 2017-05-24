
import React from 'react';
import { render } from 'react-dom';
import Provider from './provider';
import App from './app';

 // if (module.hot) {
 //  console.log('module hot');
 //   module.hot.accept('./app.js', () => {
 //     console.log('accepted')
 //     const NextRootContainer = require('./app.js').default;
 //     render(<NextRootContainer />, document.getElementById('root'));
 //   });
 // } else {
 //  console.log('module not hot')
 // }

render(
  <Provider>
    <App/>
  </Provider>,
  document.getElementById('root')
);
