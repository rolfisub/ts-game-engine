const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");


module.exports = {
  //mode: "production",
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve("./build"),
    publicPath: "/"
  },
  devServer: {
    contentBase:'./build',
    hot: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: "ts-loader"
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: "./src/ski-game/public/index.html",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([
      {
        from: 'src/ski-game/public/img',
        to:'img'
      }
    ])
  ]
};
