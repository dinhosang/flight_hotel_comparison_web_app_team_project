config = {
  entry: __dirname + "/src/app.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/build"
  },
  devtool: "source-map",
  mode: process.env.NODE_ENV || "development"
}

module.exports = config;
