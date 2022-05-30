const htmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
module.exports = {
  entry: path.join(__dirname, "src/index.ts"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "standard-form",
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
  ],
};
