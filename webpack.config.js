const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  entry: {
    background: "./src/index.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: ".", context: "public" }],
    }),
  ],
};
