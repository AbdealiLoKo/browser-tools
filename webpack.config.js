/* eslint-env node */
'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';
  return {
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/home/home.html',
      }),
    ],
    mode: isDevelopment ? 'development' : 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.scss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    entry: {
      home: { import: './src/home/home.ts' },
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    optimization: {
      runtimeChunk: 'single',
    },
    devServer: {
      compress: true,
      port: 9000,
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
