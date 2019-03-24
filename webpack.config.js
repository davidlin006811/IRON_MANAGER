const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MODULE_PATHS = ["./node_modules"];
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 5000,
    historyApiFallback: true
  },
  resolve: { modules: MODULE_PATHS, extensions: [".js", ".jsx", ".css"] },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(gif|png|jp(e*)g|svg)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "template.html"
    })
  ]
};
