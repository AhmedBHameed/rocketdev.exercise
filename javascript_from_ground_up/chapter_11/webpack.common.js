const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = 9000;
module.exports = {
  entry: ['./src/index.js'],
  output: {
    // filename: 'js/app.bundle.js',
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext][query]',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    client: {
      logging: 'none',
    },
    compress: true,
    port,
    setupMiddlewares: (middlewares) => {
      setTimeout(() => {
        console.log(`\n\nServer running at: http://localhost:${port}\n\n`);
      }, 1000);

      return middlewares;
    },
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify')
    },
  },
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000,
  },
  externals: [
    {
      window: 'window',
    },
  ],
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpg?g|png|svg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
};
