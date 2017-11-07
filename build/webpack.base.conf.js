'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const glob = require('glob');
const pkg=require("../package.json");
const webpack = require('webpack');
const _ = require(resolve('libs')+'/js/lodash.min');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

/*
 * create html
 * （创建html文件）
 * */
let HtmlWebpackPlugin = require('html-webpack-plugin');
// var HtmlWebpackAvalonPlugin = require('./webpack-html-webpack-plugin-avalon.config.js');


/*
 * extract css
 * （提取css文件）
 * */
let ExtractTextPlugin = require("extract-text-webpack-plugin");

/*
 * 压缩css文件
 */
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');



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
    pathname = pathname.replace('\\','/');
    entries[pathname] = [entry];
  }
  return entries;
}

//获取多模块入口css文件
let file_css = getEntry(resolve('src')+'/apps/css/**/*.?(css|scss|less)', resolve('src')+'/apps/css/');

//获取图片文件
let file_pic = getEntry(resolve('src')+'/apps/img/**/*.?(png|jpg|jpeg|gif)', resolve('src')+'/apps/img/');

//获取vue组件
let file_components = getEntry(resolve('src')+'/components/**/*.?(js|vue|html)', resolve('src')+'/components/');

//获取多模块入口js文件
let file_js = getEntry(resolve('src')+'/apps/js/**/*.js', resolve('src')+'/apps/js/');


//获取多模块入口html文件
let file_html = getEntry('./src/apps/html/**/*.html', './src/apps/html/');
//console.log(file_html);
//获取路由路径
let pages = Object.keys(file_html);
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
  publicPath: "./",

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


let tempKeys = _.union(pages,Object.keys(file_js),Object.keys(file_pic),Object.keys(file_components));
let tempCollection = [];
tempCollection.push(file_js);
tempCollection.push(file_pic);
tempCollection.push(file_components);
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
  index: [resolve('src')+'\\main'],
  // 用到什么公共lib（例如jquery.js），就把它加进common去，目的是将公用库单独提取打包
  common: ['vue','vue-router','jquery','lodash']
});

let HtmlWebpackPluginArray = [
  //第三方插件暴漏出来
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    "_": "lodash"
  }),
  /*
   * gloabal flag
   * （全局标识）
   * */
  new webpack.DefinePlugin({
    /*
     * 路由路径
     */
    __PAGES__: JSON.stringify({
      'v':join(pages,',')
    }),

    __APIURL__: JSON.stringify({
      'v':pkg.config.APIUrl
    })
  }),


  /*
   * common js
   * （公共js）
   * */
  new webpack.optimize.CommonsChunkPlugin(
    {names: ["common",'index']}
  ),


  /*
   * extract css
   * （提取css文件到单独的文件中）
   */
  //new ExtractTextPlugin("css/[name].css", {allChunks: true}),

  /*
   *create html file
   * （创建html文件）
   * */
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: resolve('/')+'./index.html',
    favicon:resolve('src')+'/apps/img/logo.png', //favicon路径
    /*
     * inject: true | 'head' | 'body' | false Inject all assets into the given template or templateContent -
     * When passing true or 'body' all javascript resources will be placed at the bottom of the body element.
     * 'head' will place the scripts in the head element.
     * */
    inject: 'body',

    // 需要依赖的模块
    chunks: ['common','index'],
    hasg:true,
    // 根据依赖自动排序
    chunksSortMode: 'dependency',
/*    minify: {
      removeComments: true,//移除HTML中的注释
      collapseWhitespace: true,//删除空白符与换行符
      collapseInlineTagWhitespace: true,//display:inline;折叠时不要在元素之间留下任何空格。
      removeRedundantAttributes: true,//当值与默认值匹配时，删除属性。
      useShortDoctype: true,//替换为doctype（HTML5）短文型
      removeEmptyAttributes: true,//使用仅含空格的值删除所有属性
      removeStyleLinkTypeAttributes: true,//type="text/css"从中删除style和link标记。其他type属性值保持不变
      keepClosingSlash: true//在单体元素上保持斜线
    }*/
  })
];
//html 模板插件
pages.forEach(function(pathname) {
  //pathname = pathname.replace("\\",'/');
  let conf = {
    filename: 'html/' + pathname + '.html', //生成的html存放路径，相对于path
    template: resolve('src')+'/apps/html/' + pathname + '.html', //html模板路径
    inject: true,
    hasg:true,
    // 需要依赖的模块
    chunks: ['common',pathname],

    // 根据依赖自动排序
    chunksSortMode: 'dependency',
    // template: path.resolve(__dirname, './src/index.html'), //html模板路径
    // favicon:'./src/img/imglogo.ico', //favicon路径
    // inject: 'body',
    // 需要依赖的模块
    // chunks: ['common', 'index',pathname+'Start', 'webpackAssets'],
    // 根据依赖自动排序
    // chunksSortMode: 'dependency'
    /*
     * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
     * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
     * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
     * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
     */
/*    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true,//删除空白符与换行符
      collapseInlineTagWhitespace: true//display:inline;折叠时不要在元素之间留下任何空格。
    }*/
  };
  HtmlWebpackPluginArray.push(new HtmlWebpackPlugin(conf));
});


module.exports = {
  entry: entry,
  output: output,
  resolve: {
    extensions: ['.js', '.vue', '.json','html','less','sass','css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery': path.join(resolve('libs'), "js/jquery/jquery.min.js"),
      'lodash': path.join(resolve('libs'), "js/lodash.min.js"),

      indexMineCss:path.join(resolve('src'), "css/index/index.less"),
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
        include: resolve('src')  // 指定匹配文件的范围
      },
      {
        test: /\.(less)(\?.*)?$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!less-loader!sass-loader',
        include: resolve('src')  // 指定匹配文件的范围
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: resolve('src'),  // 指定匹配文件的范围
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')// name: '/img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  // 配置插件项
  plugins: HtmlWebpackPluginArray
};
