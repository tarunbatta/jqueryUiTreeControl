const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './index.ts',
  output: {
    filename: 'jquery.techbytarun.jqueryuitreecontrol.js',
    path: path.resolve(__dirname, './dist'),
    library: 'jQueryUITreeControl',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  mode: 'production',
  externals: {
    jquery: 'jQuery',
    'jquery-ui': 'jQuery.ui',
  },
};
