import Vue from 'vue'
import Router from 'vue-router'
import index from '@/MainRoad/index/index';
import page from '@/MainRoad/page/page'

Vue.use(Router);//通过全局方法 Vue.use() 使用插件

let paths = __PAGES__.v.split(',');
let routes = [
  {
    path: '/',
    name: 'indexVue',
    component: index
  },
  {
    path: '/page',
    name: 'pageVue',
    component: page
  }
  ];
$.each(paths,function (k,v) {
  v = v.replace("\\",'/');
  let page = {
    path: '/'+v,
    name: v.split('/')[1],
    component: require('@/apps/js/'+v)
};
  routes.push(page)
});
console.log(routes);
export default new Router({
  routes: routes
})


