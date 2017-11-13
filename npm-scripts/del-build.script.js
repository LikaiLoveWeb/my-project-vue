let path = require('path');
let fs = require('fs');
let rimraf = require('rimraf');
let buildDir = path.resolve(__dirname, '../dist');
rimraf(buildDir, fs, function cb() {
  console.log('build目录已清空');
});
