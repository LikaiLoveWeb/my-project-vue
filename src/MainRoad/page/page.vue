<template>
  <div class="page_">
    <header-name></header-name>
    <div class="page_box" v-on:click="goIndex">{{ msg }}</div>
    <footer-name></footer-name>
  </div>
</template>

<script>
  import HeaderName from '../../components/header';
  import FooterName from '../../components/footer';
  export default {
    name: 'page',
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
  .page_box{
    width: 100%;
    height: 300px;
    text-align: center;
    line-height: 300px;
    background-color: darkseagreen;
    color: #fff;
    font-size: 50px;
  }
</style>
