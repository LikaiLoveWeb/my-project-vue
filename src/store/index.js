/**
 * Created by Administrator on 2017/10/26.
 */
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

const state = {
  count:1
};
const mutations={
  add(state){
    state.count+=1;
  },
  reduce(state){
    state.count-=1;
  }
};
export default new vuex.Store({
  state,
  mutations
})

