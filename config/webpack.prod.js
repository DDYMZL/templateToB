const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    clean: true,
  },
  plugins: [new FriendlyErrorsWebpackPlugin()],
});
