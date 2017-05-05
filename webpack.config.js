const path = require('path');
const webpack = require('webpack');

const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {test:/\.(js|jsx)$/,use:'babel-loader'}
    ]
  }
};

module.exports = config;
