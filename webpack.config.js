import webpack from 'webpack'

import _ from './libs/js/lodash.min'

import glob from 'glob'
/*
 * create html
 * （创建html文件）
 * */
import HtmlWebpackPlugin from 'html-webpack-plugin'
/*
 * extract css
 * （提取css文件）
 * */
import ExtractTextPlugin from 'extract-text-webpack-plugin'
/*
 * 压缩css文件
 */
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

let pattern2fileList = function(src, patternList, callback) {
  let pattern = '{'+patternList.join(',')+'}';
  let glob = require("glob");
  glob(pattern, {cwd:src, mark:true}, callback);
};

//demo
let patternList = ['node-glob/**/*.{js,json}','*.js', 'node-glob'];      //{,}中逗号后面不能有空格
let src = '../src';
pattern2fileList(src, patternList, function (err, fileList) {
  if(err) {
    console.log(err);
    return ;
  }
  console.log(fileList);
});
