<template>
  <div class="index">
    <header-name myfathermsg="this is my father msg!" v-on:my-event="myEventClick"></header-name>
    <div class="middle_" v-on:click="goPage">{{ msg }}</div>
    <footer-name></footer-name>
  </div>
</template>

<script>
  import HeaderName from '../../components/header';
  import FooterName from '../../components/footer';
  export default {
    name: 'index',
    data () {
      return {
        msg: 'this is index'
      }
    },
    components:{HeaderName,FooterName},
    methods:{
      goPage:function () {
        window.location.hash = '/page'
      },
      myEventClick:function (msg) {
       this.msg = this.msg+msg;
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
  .middle_{
    width: 100%;
    height: 300px;
    text-align: center;
    line-height: 300px;
    background-color: darkgoldenrod;
    color: #fff;
    font-size: 50px;
  }
</style>
