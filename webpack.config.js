/* eslint-env node */
'use strict';

const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function generateToolList() {
  let tools = [];
  fs.readdirSync('./src/tools/', { withFileTypes: true }).forEach(item => {
    if (item.isDirectory()) {
      console.log('Found tool:', item.name);
      const toolMetaFile = path.resolve('./src/tools', item.name, 'main.json');
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

function partial(name, data) {
  const source = fs.readFileSync(`src/template/partials/${name}`, 'utf-8');
  return renderContent(source, { ...data, partial });
}

function renderContent(source, data) {
  // Ref: https://github.com/jantimon/html-webpack-plugin/blob/v5.5.0/lib/loader.js#L32
  const compiled = _.template(source, { interpolate: /<%=([\s\S]+?)%>/g });
  return compiled(data);
}

function getEntryImports(prefix) {
  let imports = [];
  if (fs.existsSync(`${prefix}.scss`)) {
    imports = [...imports, `${prefix}.scss`];
  }
  if (fs.existsSync(`${prefix}.ts`)) {
    imports = [...imports, `${prefix}.ts`];
  }
  if (imports.length == 0) {
    throw Error(`Got 0 imports for ${prefix}`);
  }
  return imports;
}

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';
  const tools = generateToolList();

  return {
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/home/home.html',
        chunks: ['home'],
        templateParameters: { partial },
      }),
      new HtmlWebpackPlugin({
        filename: 'tools.html',
        template: 'src/tools/tools.html',
        chunks: ['tools'],
        templateParameters: { tools, partial },
      }),
      ...tools.map(tool => {
        return new HtmlWebpackPlugin({
          filename: `tools/${tool.slug}.html`,
          template: `src/template/tool.html`,
          chunks: [`tool-${tool.slug}`],
          templateParameters: {
            info: tool,
            partial,
            content: renderContent(fs.readFileSync(`src/tools/${tool.slug}/main.html`), { info: tool, partial }),
          },
        });
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
      home: { import: getEntryImports('./src/home/home') },
      tools: { import: getEntryImports('./src/tools/tools') },
      ...Object.fromEntries(
        tools.map(tool => {
          return [`tool-${tool.slug}`, { import: getEntryImports(`./src/tools/${tool.slug}/main`) }];
        }),
      ),
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
