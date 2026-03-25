const path = require("path");

module.exports = {
  entry: {
      opencv: "./src/opencv-init.js", // Creates 'opencv.bundle.js' (or as specified below)
      capacitor: "./src/capacitor-init.js",
  },

  output: {
    filename: "[name].bundle.js", // [name] is replaced by the entry key (main, analytics)
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