const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  plugins: [new HtmlWebpackPlugin({ template: "template.html" })],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // inject CSS to page
            loader: "style-loader"
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
  }
};
