const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { template } = require('@babel/core')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './src/script.js',  // говорим, где у нас в проекте точка входа - файл, где происходит рендер приложения и т.п.
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.svg$/,
      type: 'asset/resource'
    }, {
      test: /\.json$/,
      type: 'asset/resource'
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],
  devServer: {
    open: true
  }
}