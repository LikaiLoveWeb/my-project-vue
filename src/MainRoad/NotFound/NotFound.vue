<template>
  <div class="index">
    <header-name myfathermsg="this is my father msg!" v-on:my-event="myEventClick"></header-name>
    <div class="middle_" >
      <div class="NotFound">
       <span>404---></span>
        <div>倒计时{{setIntervalMsg}}s，返回首页</div>
      </div>
    </div>
    <footer-name></footer-name>
  </div>
</template>

<script>
  import HeaderName from '@/components/header';
  import FooterName from '@/components/footer';
  import store from '@/store/index'
  export default {
    name: 'NotFound',
    data () {
      return {
        msg: 'this is index',
        num_:0,
        setIntervalMsg:30
      }
    },
    components:{HeaderName,FooterName},
    mounted:function () {
        let that = this;
      console.log($('div'),'测试jquery 是否引入成功');
      let code = false;
      if(_.isEmpty(code)){
        console.log('测试是否引入lodash插件');
        let code = setInterval(function () {
          that.setIntervalMsg = Number(that.setIntervalMsg);
          that.setIntervalMsg--;
          if(that.setIntervalMsg<10&&that.setIntervalMsg>0){
              that.setIntervalMsg = '0'+that.setIntervalMsg;
          }
          if(that.setIntervalMsg<=0){
              clearInterval(code);//清除定时器
            setTimeout(function () {
              window.location.href='/'
            },1000)
          }
        },1000)
      }
    },
    methods:{
      goPage:function () {
        window.location.hash = '/page'
      },
      myEventClick:function (msg) {
        this.msg = msg;
        console.log(this.msg)
      }
    },
    computed:{
      reMsg:function () {
        return this.msg.split('').reverse().join('')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @base_: #f938ab;
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
    font-size: 16px;
    color: cadetblue;
  }

  a {
    color: #42b983;
  }
  .middle_{
    width: 100%;
    height: 200px;
    text-align: center;
    line-height: 200px;
    color: #fff;
    background-color: @base_;
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .middle_ button{
    padding: 5px;
    font-size: 18px;
    border-radius: 4px;
    border:0;
    background-color: #fff;
    cursor:pointer;
  }
  .middle_ button:active{
    background-color: #ccc;
  }
  a,button,input{
    /*  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-user-modify: read-write-plaintext-only;*/
    outline: none;
    box-shadow: none;
  }
  .NotFound{
    text-align: center;
    line-height: inherit;
    height:100%;
  }
  .NotFound *{
    display: inline-block;
  }
</style>
