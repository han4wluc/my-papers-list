
import React from 'react';
import { render } from 'react-dom';

try {
  !!window; // no window during server-rendering;
  if (module.hot) {
    module.hot.accept('./rootContainer.js', () => {
      const NextRootContainer = require('./rootContainer.js').default;
      render(
        <NextRootContainer/>,
        document.getElementById('root')
      );
    });
  }
  const RootContainer = require('./rootContainer.js').default;
  render(
    <RootContainer/>,
    document.getElementById('root')
  );
} catch (error){
  // already rendered by server side
}
