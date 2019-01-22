const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const argv = require("yargs").argv;

let mode = "";
switch (argv.mode) {
  case "production": {
    mode = argv.mode;
    break;
  }
  default: {
    mode = "development";
  }
}

module.exports = {
  mode,
  entry: "./src/index.ts",
  devtool: mode === "development" ? "eval" : "sourcemap",
  output: {
    filename: "bundle.js",
    path: path.resolve("./build"),
    publicPath: ""
  },
  devServer: {
    contentBase: "./build",
    hot: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
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
        from: "src/ski-game/public/img",
        to: "img"
      }
    ])
  ]
};
