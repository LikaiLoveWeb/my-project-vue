/**
 * Created by Administrator on 2017/10/26.
 */
import Vue from 'vue'
import vuex from 'vuex'
import header_vuex from '@/components/header_vuex'
Vue.use(vuex);

const mutations={
  add(state){
    state.count+=1;
  },
  reduce(state){
    state.count-=1;
  }
};
export default new vuex.Store({
  state:{
    count:1
  },
  mutations,
  modules: {
    headerVuex: header_vuex
  }
})
