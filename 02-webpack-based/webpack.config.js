const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devtool: isProd  ? 'hidden-source-map' : 'eval-cheap-module-source-map',
  devServer: {
    contentBase: 'dist',
    hot: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Vue.js 3.0',
      template: 'public/index.html'
    })
  ]
}
