import Vue from 'vue'
import Router from 'vue-router'
import index from '@/MainRoad/index/index';
import page from '@/MainRoad/page/page'
import NotFound from '@/MainRoad/NotFound/NotFound'

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
    },
    {
      path: '*', //除了上面的页面全部都走404页面
      name: 'NotFound',
      component: NotFound
    }
  ]
})
