// shared webpack config object for dev, build, prod, demo...

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // mode: 'development',
  // devtool: 'eval-source-map',

  // entry: path.resolve(__dirname, '../src/render.js'),
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, '../dist'),
  // },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // when node-sass and sass were installed，by default sass-loader prefers sass.
              implementation: require('sass'),
              sassOptions: {
                // fiber: require('fibers'),
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    // template: path.resolve(process.cwd(), 'public/index.html'),
    // template: './public/demo.html',
    // filename: 'index.html',
    // }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: {},
  },
};
