<template>
  <div class="hello">
    <h1>Awesome!</h1>
    <h3>你的开发环境已经准备就绪，来试试一键初始化工具吧！</h3>
    <div class="content">
      <div class="info">
        <div class="item">
          <input type="checkbox" v-model="data.vuex">添加 Vuex 模块
        </div>
        <div class="item">
          <input type="checkbox" v-model="data.api">添加 Api 模块
        </div>
        <div class="item">
          <input type="checkbox" v-model="data.router">生成 Vue-router 路由表
        </div>
        <div class="item">
          <input type="checkbox" v-model="data.isEle">使用 element-ui
        </div>
        <div class="item">
          <input type="checkbox" v-model="data.isPug">使用 pug
        </div>
        <div class="row">
          {{msg}}
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
  name: "hello",
  data() {
    return {
      data: {
        pages: [
          {
            module: "/",
            pages: [{ name: "main" }, { name: "navFrame" }, { name: "login" }]
          },
          {
            module: "post",
            pages: [{ name: "new" },{ name: "list" }, { name: "edit" }]
          },
          {
            module: "user",
            pages: [{ name: "index" }, { name: "profile" }]
          }
        ],
        vuex: true,
        api: true,
        router: true,
        isEle: true,
        isPug: true
      },
      msg: ""
    };
  },
  filters: {
    parseData(val) {
      return JSON.stringify(val);
    }
  },
  methods: {
    init() {
      this.$API.init(this.data).then(res => {
        this.msg = res;
      });
    }
  }
};
</script>

<style lang="less" scoped>
button {
  padding: 0.5em 1em;
  border-radius: 5px;
  background: white;
  .border(@border);
  cursor: pointer;
  &:hover {
    .border(@primary);
    background: @primary;
    color: white;
  }
}
button.small {
  padding: 0.2em 0.5em;
}
button.danger {
  color: @error;
  .border(@error);
  &:hover {
    .border(@error);
    background: @error;
    color: white;
  }
}
button.success {
  color: @success;
  .border(@success);
  &:hover {
    .border(@success);
    background: @success;
    color: white;
  }
}

input {
  width: 90px;
  padding: 0.2em 0.5em;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin: 0 5px;
  vertical-align: middle;
}

.line(@color) {
  position: relative;
  &:before {
    content: "";
    height: 1px;
    width: 40px;
    display: block;
    position: absolute;
    margin-top: 20px;
    right: 100%;
    background: @color;
  }
  &:after {
    content: "";
    height: 39px;
    width: 1px;
    display: block;
    position: absolute;
    background: @color;
    left: -40px;
    top: -19px;
  }
}

.item {
  line-height: 40px;
  .module {
    .line(@black);
    input {
      .border(@black);
    }
    margin-left: 35px;
  }
  .btn {
    display: inline-block;
    padding-left: 5px;
  }
}

.subItem {
  .line(@error);
  margin-left: 60px;
  input {
    .border(@error);
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
    text-align: left;
    margin: 0 10px;
  }
  .form {
    .child;
    width: 300px;
    overflow: hidden;
  }
  .info {
    .child;
    width: 250px;
    padding: 1em;
    .row{
      color:@success;
      font-size: 12px;
      margin-top: 2em;
      text-align: center;
    }
  }
}
</style>
