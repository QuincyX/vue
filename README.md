# vue-cli模板

> A Vue.js project template by Quincy 

该模板包含vuex、vue-router、axios，使用less，内置less全局变量方法、全局filters

可一键生成项目结构的Vue工程模板，包括vue组件页面、vue-router路由表、api模块、vuex模块

### 使用方法
``` bash
# 如果还没有安装vue-cli，请先安装
npm i -g vue-cli

# 生成新项目
vue init quincyx/vue my-project
```

## 一键初始化项目方法

请先在`./init/pages.js`里定义好目录结构，内容是一个值为字符串的数组，以 `/` 开头表示页面根目录，文件后边不需要加`.vue`扩展名   
如果是二级目录会自动识别成为一个模块，并添加到vuex中 

示例：
```
module.exports = [
  '/login',
  '/home',
  '/post/list',
  '/post/info',
  '/user/index',
  '/user/info'
]
```

一键生成
```
npm run init
```


wx：likequincy

