const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // inject CSS to page
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
          },
          {
            // translates CSS into CommonJS modules
            loader: "css-loader"
          },
          {
            // Run postcss actions
            loader: "postcss-loader"
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "template.html" })].concat(
    devMode ? [] : [new MiniCssExtractPlugin({ filename: "style.css" })]
  )
};
