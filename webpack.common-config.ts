import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { AngularWebpackPlugin } from '@ngtools/webpack';
import linkerPlugin from '@angular/compiler-cli/linker/babel';

export const commonConfig = {
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
            plugins: ['@babel/plugin-proposal-object-rest-spread', linkerPlugin]
          }
        }
      },
      {
        test: /\.[jt]sx?$/,
        loader: '@ngtools/webpack',
      },
      // {
      //   test: /\.[cm]?js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       cacheDirectory: true,
      //       compact: false,
      //       plugins: [linkerPlugin],
      //     },
      //   },
      // },
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
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new AngularWebpackPlugin({
      // "mainPath": "src/index.ts",
      // "platform": 0,
      // "sourceMap": true,
      "tsconfig": "tsconfig.json",
      jitMode: false,
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
    // new ForkTsCheckerWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [{ from: 'src/assets', to: 'assets' }]
    // }),
    // new ESLintPlugin({
    //   extensions: ['.tsx', '.ts', '.js'],
    //   exclude: 'node_modules',
    //   context: 'src'
    // })
    // new BundleAnalyzerPlugin(),
  ]
};
