require('babel-register')({
  presets: [ 'es2015', 'stage-2', 'react']
});
require('babel-polyfill');

require('./scrape_2');