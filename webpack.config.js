// import path from 'path';
// import HtmlWebpackPlugin from "html-webpack-plugin";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import CleanWebpackPlugin from "clean-webpack-plugin";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


const nodeExternals = require("webpack-node-externals");


module.exports = {
  entry: {
    main: "./src/pages/index.js",
  },
  target: "async-node",
  externalsPresets: { node: true },   // <-- here
  externals: [nodeExternals()],  
  output: {
    path: path.resolve(__dirname, "dist"),
    // path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    // static: path.resolve(__dirname, "./dist"),
    static: path.resolve(__dirname, "dist"),

    open: true,
    compress: true,
    // port: 8080,
  },
  // fallback: {
  //   "fs": false,
  //   "tls": false,
  //   "net": false,
  //   "path": false,
  //   "zlib": false,
  //   "http": false,
  //   "https": false,
  //   "stream": false,
  //   "crypto": false,
  //   "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash][ext]",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
