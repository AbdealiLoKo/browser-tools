/* eslint-env node */
'use strict';

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function generateToolList() {
  let tools = [];
  fs.readdirSync('./src/tools/', { withFileTypes: true }).forEach(item => {
    if (item.isDirectory()) {
      console.log('Found tool:', item.name);
      const toolMetaFile = path.resolve('./src/tools', item.name, 'app.json');
      let toolMeta = {
        name: item.name,
        slug: item.name,
      };
      if (fs.existsSync(toolMetaFile)) {
        toolMeta = { ...toolMeta, ...JSON.parse(fs.readFileSync(toolMetaFile, 'utf-8')) };
      }
      tools = [...tools, toolMeta];
    }
  });

  console.log(`Found ${tools.length} tools`);
  tools = tools.sort((a, b) => {
    return a.name > b.name;
  });

  return tools;
}

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';
  return {
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/home/home.html',
        chunks: ['home'],
      }),
      new HtmlWebpackPlugin({
        filename: 'tools.html',
        template: 'src/tools/tools.html',
        chunks: ['tools'],
        templateParameters: {
          tools: generateToolList(),
        },
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
      tools: { import: './src/tools/tools.ts' },
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
