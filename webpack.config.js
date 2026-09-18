const path = require('path')

module.exports = {
  mode: 'development',
  entry: './js/script.js',  // говорим, где у нас в проекте точка входа - файл, где происходит рендер приложения и т.п.
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}