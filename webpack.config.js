const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './app/assets/javascripts/app.js',
    admin: './app/assets/javascripts/admin.js',
    admin_authentification: './app/assets/javascripts/admin_authentification.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'javascripts/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/'
              }
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images'
        },
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'stylesheets/[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Carousel: 'exports-loader?Carousel!bootstrap/js/src/carousel',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/src/dropdown'
    }),
    new CleanWebpackPlugin({
      dry: true,
      verbose: true
    })
  ],
  resolve: {
    extensions: [
      '.js'
    ],
    alias: {
      'jquery': 'jquery/dist/jquery.slim.min'
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
