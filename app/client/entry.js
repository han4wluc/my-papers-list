
console.log('start')

require('babel-register')({
  presets: [ 'es2015', 'stage-2', 'react']
});
require('babel-polyfill');


require('./entry_');
