const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = env => ({
  mode: env.production ? 'production' : 'development',
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
  devtool: env.production ? 'hidden-source-map' : 'cheap-eval-source-map',
  devServer: {
    contentBase: 'dist',
    hot: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Vue.js 3.0 Beta',
      template: 'public/index.html'
    }),
    env.production ? null : new webpack.HotModuleReplacementPlugin()
  ].filter(i => i)
})