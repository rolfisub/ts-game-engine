const path = require("path");
const fs = require("fs");
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

let game = "";
if (argv.game && typeof argv.game === "string") {
  game = argv.game;
} else {
  throw new Error("game parameter is required. Example: yarn dev sky-game ");
}

if (!fs.existsSync(path.resolve("./src", game))) {
  throw new Error("game: " + game + " not found.");
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
      template: "./src/" + game + "/public/index.html",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([
      {
        from: "src/" + game + "/public/assets",
        to: "assets"
      }
    ])
  ]
};
