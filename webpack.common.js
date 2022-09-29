/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { AngularWebpackPlugin } = require('@ngtools/webpack');
// import linkerPlugin from '@angular/compiler-cli/linker/babel';
// const linkerPlugin = require('@angular/compiler-cli/linker/babel');
// const  { linkerPlugin } = require('@angular/compiler-cli/linker/babel');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].[contenthash].js',
    libraryTarget: 'umd',
    library: 'MyLib',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@angular/compiler-cli/linker/babel']
          }
        }
      },
      {
        test: /\.[jt]sx?$/,
        loader: '@ngtools/webpack',
      },
      {
        test: /\.[cm]?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            compact: false,
            plugins: ['@angular/compiler-cli/linker/babel'],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib", to: "dist" },
        { from: "./node_modules/fundamental-styles/dist/theming", to: "dist/fundamental-styles/theming" },
        // { from: "other", to: "public" },
      ],
    }),
    new AngularWebpackPlugin({
      "tsConfigPath": "tsconfig.json",
      jitMode: false,
      sourceMap: false,
      "compilerOptions": {}
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // new BundleAnalyzerPlugin(),
  ]
};
