import HeaderName from '@/components/header';
import FooterName from '@/components/footer';
import Vue from 'vue';

let vm = new Vue({
  id: '#index_',
  data () {
    return {
      msg: 'this is index',
      num_: 0
    }
  },
  components: {HeaderName, FooterName},
  mounted: function () {
    //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    console.log($('div'), 'jquery 已经成功引入');
    let code = true;
    if (_.isEmpty(code)) {
      console.log('验证第三方插件lodash是否生效')
    } else {
      console.log('验证第三方插件lodash是否生效')
    }
  },
  methods: {
    goPage: function () {
      window.location.hash = '/page'
    },
    myEventClick: function (msg) {
      this.msg = msg;
      console.log(this.msg)
    }
  },
  computed: {
    reMsg: function () {
      return this.msg.split('').reverse().join('')
    }
  }
});


