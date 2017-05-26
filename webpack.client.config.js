
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: [
    // 'react-hot-loader/patch', // RHL patch
    // 'webpack-hot-middleware/client',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    // 'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    // path.resolve(__dirname, 'app/client/app.js') // Your app's entry point
    path.resolve(__dirname, 'app/client/entry.js') // Your app's entry point
  ],
  // entry: path.resolve(__dirname, 'app/client/index.js'),

  output: {
    path: path.resolve(__dirname, 'app/server/static/'),
    publicPath: 'app/server/static/',
    filename: 'bundle.js'
  },

  // devServer: {
  //   historyApiFallback: true,
  // },

  // comment for server rendering
  // devServer: {
  //   contentBase: 'http://localhost:8000'
  // },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // 'transform-decorators-legacy'
  ],

  module: {
    loaders: [{
      test: /\.js$/,// A regexp to test the require path. accepts either js or jsx
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-decorators-legacy'],
        presets: ['es2015', 'stage-2', 'react'],
      },
      // loaders: [/*'react-hot-loader/webpack', */'babel-loader?presets[]=es2015&presets[]=stage-2&presets[]=react'],
    },
    // {
    //    test: /\.js$/,
    //    exclude: /node_modules/,
    //    loader: 'react-hot-loader/webpack',
    // }
    ],
    // plugins: ['transform-decorators-legacy'],
  },
};
