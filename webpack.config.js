const path = require("path");

module.exports = {
  entry: "./src/opencv-init.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./www/js")
  },

  experiments: {
    asyncWebAssembly: true
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto"
      }
    ]
  },

  resolve: {
    extensions: [".js"],

    fallback: {
      path: false,
      fs: false,
      crypto: false
    }
  }
};