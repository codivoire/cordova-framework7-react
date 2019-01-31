var webpackMerge = require("webpack-merge");
var commonConfig = require("./webpack.config.common");

module.exports = webpackMerge(commonConfig, {});
