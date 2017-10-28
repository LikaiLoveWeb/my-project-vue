/**
 * Created by Administrator on 2017/10/27.
 */
export default {
  state:{
    show:true
  },
  mutations:{
    switch_dialog(state){//这里的state对应着上面这个state
      state.show = state.show?false:true;
      //你还可以在这里执行其他的操作改变state
    }
  },
  actions:{//官方推荐 , 将异步操作放在 action 中。
    switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
      context.commit('switch_dialog');
      //你还可以在这里触发其他的mutations方法
    }
  },
  computed:{
    show:function () {
     console.log(this.show)
    }
  }
}
