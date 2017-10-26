<template>
  <div class="index">
    <header-name myfathermsg="this is my father msg!" v-on:my-event="myEventClick"></header-name>
    <div class="middle_" v-on:click="goPage">
      <button @click="$store.commit('add')">+</button>
      <button>{{$store.state.count}}</button>

      <button @click="$store.commit('reduce')">-</button>
    </div>
    <footer-name></footer-name>
  </div>
</template>

<script>
  import HeaderName from '../../components/header';
  import FooterName from '../../components/footer';
  import store from '../../store/index'
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
       // window.location.hash = '/page'
      },
      myEventClick:function (msg) {
       this.msg = msg;
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
</style>
