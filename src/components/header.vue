<template>
  <div class="header_" v-on:click="onHeaderClick">
    <h1>{{ msg }}</h1>
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
        this.$emit('my-event',this.msg)  //子组件给父组件通信
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  .header_{
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 22px;
    background-color: cadetblue;
    color: #fff;
  }
</style>
