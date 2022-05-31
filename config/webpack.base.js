const htmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  cache: {
    type: 'filesystem',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset',
        generator: {
          filename: 'images/[name]-[hash][ext]',
        },
      },
      {
        test: /\.(eot|svg|ttf|woff2?|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash][ext]',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'standard-form',
      template: './index.html',
    }),
    new VueLoaderPlugin(),
  ],
};
