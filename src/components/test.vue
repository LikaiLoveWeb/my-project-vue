<template>
  <div class="hello">
    <input @keyup.enter="onEnter" type="text" v-model="newItem">
    <h1 @click="testClick">{{ msg }}</h1>
    <ul>
      <li v-for="(item,index) in list" v-bind:class="{liClass:item.btn}" v-on:click="activeLi(item)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data () {
      return {
        msg: 'this is todoList',
        list:[],
        newItem:''
      }
    },
    beforeCreate:function () {
      //在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
      console.log('a is beforeCreate----'+new Date().getTime())
    },
    created: function () {
      // `this` 指向 vm 实例
      console.log('a is: ' + this.msg+'====='+new Date().getTime())
    },
    beforeMount:function () {
      //在挂载开始之前被调用：相关的 render 函数首次被调用。
      console.log('a is beforeMount====='+new Date().getTime())
    },
    mounted:function () {
      //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
      console.log('a is mounted====='+new Date().getTime())
    },
    beforeUpdate:function () {
      //数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
      console.log('a is beforeUpdate====='+new Date().getTime())
    },
    update:function () {
      //由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
      console.log('a is update====='+new Date().getTime())
    },
    methods: {
      testClick:function ($event) {
        let that = this;
        that.msg = '我是测试修改你！'+new Date().getTime();
      },
      activeLi:function (item) {
        let itemUpdate = item;
        itemUpdate.btn = !itemUpdate.item;
        console.log(itemUpdate);
      },
      onEnter:function () {
        let name = this.newItem;
        let item = {
          name:name,
          btn:false
        };
        this.list.push(item);
        this.newItem = '';
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
    height:300px;
    width: 100%;
    overflow-y: scroll;
  }

  li {
    display: block;
    height: 50px;
    line-height:50px;
    text-align: center;
  }
  a {
    color: #42b983;
  }
  .liClass{
    background: red;
    color: #fff;
    display: block;
    width: 100%;
  }
</style>
