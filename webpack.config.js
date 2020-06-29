const webpack = require('webpack'); 
const path = require('path');
const slsw = require('serverless-webpack');

/**
  TypeOrm does not work well with webpack, we inject a env variable here to be used at .env.ts
  to define how typeorm will receive it's params.
*/
slsw.lib.serverless.service.provider.environment.isWebpacked = true;

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/)
  ],
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
};
