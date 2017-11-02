'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf');
const glob = require('glob');
const webpack = require('webpack');
const _ = require(resolve('libs')+'/js/lodash.min');

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
let file_html = getEntry('./src/apps/html/**/*.html', './src/html/');
//获取路由路径
let pages = Object.keys(file_html);

console.log(pages);



let output = {
  /*
   *  determines the location on disk the files are written to
   *  （输出目录）
   * */
  path: path.join(__dirname, 'dist'),

  /*
   * The publicPath specifies the public URL address of the output files when referenced in a browser
   * （发布后，资源的引用目录）
   * */
  publicPath: "",

  /*
   * Specifies the name of each output file on disk
   * （文件名称）
   * */
  filename: 'js/[name].js'

  /*
   * The filename of non-entry chunks as relative path inside the output.path directory.
   * （按需加载模块时输出的文件名称）
   * */
  // chunkFilename: 'js/[name].js'

};
let tempArray = {};
function join(array, separator) {
  let nativeJoin = Array.prototype.join;
  return array == null ? '' : nativeJoin.call(array, separator);
}
_.forEach(tempKeys,function (value) {
  tempArray[value] = join(_.remove(_.map(tempCollection, value),undefined),',').split(',');
});
/*
 * The entry point for the bundle.
 * （入口）
 * */
let entry = Object.assign(tempArray, {
  // 路由入口
  index: ['./src/main.js'],
  // 用到什么公共lib（例如jquery.js），就把它加进common去，目的是将公用库单独提取打包
  common: ['vue','vue-router','jquery','lodash']
});

module.exports = {
  entry: entry,
  output: output,
  resolve: {
    extensions: ['.js', '.vue', '.json','html'],
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
        test: /\.less$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
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
  },
  // 配置插件项
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "_": "lodash"
    }),
  ]
};
