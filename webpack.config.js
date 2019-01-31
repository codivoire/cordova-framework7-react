var dev = require("./config/webpack.config.dev");
var prod = require("./config/webpack.config.prod");

var isProduction = process.env.NODE_ENV === "production";
console.log("Env: ", process.env.NODE_ENV);

module.exports = isProduction ? prod : dev;
