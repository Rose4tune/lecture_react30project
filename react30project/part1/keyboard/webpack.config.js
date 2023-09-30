const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: "./src/js/index.js",
  output : {
    filename : "bundle.js",
    path: path.resolve(__dirname,"./dist"),
    clean: true
  },
  devtool: "source-map", 
  mode: "development",
  devServer: {
    host: "localhost",
    port: 8081,
    open: true,
    watchFiles: 'index.html'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "keyboard",
      template: "./index.html",
      inject: "body", //bundel된 js 넣는 위치 설정
      favicon: "./flag.svg"
    }),
    new MiniCssExtractPlugin({filename:"style.css"})
  ],
  module: {
    rules: [
      {//css 파일 읽는 로더 설정
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  }
}