'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const _ = require('../libs/js/lodash.min');
const webpack = require('webpack');
const glob = require('glob');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

/**
 * 获得路径
 * @param globPath: str
 * @param pathDir: str 对比路径
 * @returns {{}}
 */
function getEntry(globPath, pathDir) {
  let files = glob.sync(globPath);
  let entries = {},
    entry, dirname, basename, pathname, extname;

  for (let i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.normalize(path.join(dirname,  basename));
    pathDir = path.normalize(pathDir);
    if(pathname.startsWith(pathDir)){
      pathname = pathname.substring(pathDir.length)
    }
    entries[pathname] = [entry];
  }
  return entries;
}
//获取多模块入口html文件
const file_vue = getEntry(resolve('src')+'/MainRoad/**/*.vue', resolve('src')+'./src/MainRoad/');
//获取路由路径
const pages = Object.keys(file_vue);
console.log(pages);

module.exports = {
  entry: {
    app: './src/main.js',
    common: [
      'jquery','lodash'
    ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery': path.join(resolve('libs'), "js/jquery/jquery.min.js"),
      'lodash': path.join(resolve('libs'), "js/lodash.min.js"),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'autoprefixer']
      }, {
        test: /\.less/,
        loaders: ['style', 'css', 'autoprefixer', 'less'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};


