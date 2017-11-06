import Vue from 'vue';
import HeaderName from '@/components/header';
import FooterName from '@/components/footer';
let vm = new Vue({
  id:'#page_',
  data () {
    return {
      msg: 'this is page'
    }
  },
  components:{HeaderName,FooterName},
  methods:{
    goIndex:function () {
      window.location.hash = '/'
    }
  },
  mounted:function () {
    //挂载完毕
    console.log($('div'))
  }
});
