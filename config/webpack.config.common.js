const path = require("path");
const webpack = require('webpack');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssnano = require("cssnano");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../www"),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".js", ".json", '.scss']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                cssnano()
              ]
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "../www"),
    compress: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../www/bundle.css"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      proxy: "http://localhost:8080/"
    }, {
        reload: false
      })
  ]
};
