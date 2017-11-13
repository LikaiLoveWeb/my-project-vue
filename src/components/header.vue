<template>
  <div class="header_" >
   <div v-on:click="$store.dispatch('switch_dialog')">
     <h1 v-show="$store.state.headerVuex.show">{{ msg }}</h1>
   </div>
    <div>
      <button v-on:click="onHeaderClick">测试</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderName',
    data () {
      return {
        msg: 'this is header'
      }
    },
    props:['myfathermsg'],
    methods: {
      onHeaderClick:function (){
        //alert(this.myfathermsg); //父组件向子组件通信
        this.$emit('my-event',this.msg);  //子组件给父组件通信
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  body,html{
    margin: 0;
    padding: 0;
    border:0;
  }
  @code:red;
  h1, h2 {
    font-weight: normal;
    background-color: @code;
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
  .header_{
    width: 100%;
    text-align: center;
    font-size: 22px;
    background-color: cadetblue;
    color: #fff;
    overflow: hidden;
  }
  .header_ div{
    display: inline-block;
  }
</style>
