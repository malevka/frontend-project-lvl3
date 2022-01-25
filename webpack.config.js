const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  plugins: [new HtmlWebpackPlugin({ template: "template.html" })]
};
