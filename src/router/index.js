import Vue from 'vue'
import Router from 'vue-router'
const path = require('path');
import index from '@/MainRoad/index/index';
import page from '@/MainRoad/page/page'

Vue.use(Router);//通过全局方法 Vue.use() 使用插件

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const dirs = resolve('src');
//同步获取指定文件（App_PATH）夹下的文件（全部.js文件）
/*let entryFiles = glob.sync(dirs + '/MainRoad/!**!/!*.vue');
console.log(entryFiles);*/

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/page',
      name: 'page',
      component: page
    }
  ]
})
