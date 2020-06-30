const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const os = require('os');

const isWindows = os.type() === 'Windows_NT';
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const babelOptions = (preset) => {
  const opts = {
    presets: [
      '@babel/preset-env',
    ],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

module.exports = {
  mode: 'none',
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', 'scss'],
    alias: {
      
    },
  },
  devServer: {
    historyApiFallback: true,
    port: 4120,
    open: isWindows ? 'chrome' : 'google-chrome',
    proxy: {
      "/astronauts": 'http://localhost:4320/',
      "secure": false,
      "changeOrigin": true
    },
  },
  devtool: isDev ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
  ],
};