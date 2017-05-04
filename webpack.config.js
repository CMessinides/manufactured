const path = require('path');
const webpack = require('webpack');

const config = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, '_site/js'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {test:/\.(js|jsx)$/,use:'babel-loader'}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};

module.exports = config;
