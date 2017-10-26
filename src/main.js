// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//vuex

Vue.config.productionTip = false;//设置为 false 以阻止 vue 在启动时生成生产提示。



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//路由
  store,//使用store
  template: '<App/>',
  components: { App }
});


