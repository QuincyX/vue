<template>
  <div class="hello">
    <h1>Awesome!</h1>
    <h3>你的开发环境已经准备就绪，来试试一键初始化工具吧！</h3>
    <div class="content">
      <div class="info">
        <div class="row">

        </div>
        <div class="row">

        </div>
      </div>
      <div class="form">
        <div class="item" v-for="(i,index) in data.pages" :key="index">
          <span class="module">
            <input type="text" v-model="i.module" :disabled="i.module==='/'">
          </span>
          <div class="btn">
            <button class="small" @click="i.pages.push({name:'page'+(i.pages.length+1)})">+</button>
            <button class="small danger" v-show="i.module!=='/'" @click="data.pages.splice(index,1)">X</button>
          </div>
          <div class="subItem" v-for="(p,pIndex) in i.pages" :key="pIndex">
            <span class="page">
              <input type="text" v-model="p.name">
            </span>
            <div class="btn">
              <button class="small danger" @click="i.pages.splice(pIndex,1)" v-show="i.pages.length>1">X</button>
            </div>
          </div>
        </div>
        <div class="toolBar">
          <button class="small success" @click="data.pages.push({module:'module'+(data.pages.length+1),pages:[{name:'page1'}]})">添加 模块 / 分类</button>
        </div>
      </div>
    </div>

    <button @click="init">initialization</button>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      data: {
        pages: [
          { module: '/', pages: [{ name: 'dev' }] }
        ],
        msg: '123456'
      }
    }
  },
  filters: {
    parseData(val) {
      return JSON.stringify(val)
    }
  },
  methods: {
    init() {
      this.$API.init('/init', {}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
input {
  width: 90px;
  padding: .2em .5em;
}

.line(@color) {
  position: relative;
  &:before {
    content: "";
    height: 1px;
    width: 100px;
    display: block;
    position: absolute;
    margin-top: 20px;
    right: 100%;
    background: @color;
  }
}

.item {
  line-height: 40px;
  .module {
    .line(@dark);
    input {
      .border(@dark);
    }
    margin-left: 35px;
  }
  .btn {
    display: inline-block;
    padding-left: 5px;
  }
}

.subItem {
  .line(@warn);
  margin-left: 60px;
  input {
    .border(@warn);
  }
}

.toolBar {
  padding: 10px 30px;
  
}

.content {
  width: 1000px;
  margin: 2em auto;
  .child {
    .inline;
    .border(@border);
    vertical-align: top;
  }
  .form {
    .child;
    width: 500px;
    text-align: left;
    overflow: hidden;
  }
  .info {
    .child;
    width: 350px;
    padding: 1em;
  }
}
</style>
