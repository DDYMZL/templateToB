const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "../index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "standard-form",
      template: "./index.html",
    }),
  ],
};
