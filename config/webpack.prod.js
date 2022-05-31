const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    clean: true,
  },
  plugins: [new MiniCssExtractPlugin()],
});
