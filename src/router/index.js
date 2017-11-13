import Vue from 'vue'
import Router from 'vue-router'
import index from '@/MainRoad/index/index';
import page from '@/MainRoad/page/page'

Vue.use(Router);//通过全局方法 Vue.use() 使用插件

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
