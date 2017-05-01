
require('babel-core/register')({
  presets: [ 'es2015', 'stage-2', 'react'],
});
require('babel-polyfill');

// require('./client/modules/home/utils/tests');
// require('./server/api/tests/parse');
// require('./server/api/tests/integration');

require('./server/utils/tests/arxiv');
