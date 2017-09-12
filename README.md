# vue-cli模板

> A Vue.js project template by Quincy 

### 使用方法
``` bash
# 依模板生成新项目
vue init quincyx/vue my-project

# 如果还没有安装vue-cli，请先安装
npm i -g vue-cli
```

## 项目初始化方法

先在`./init/pages.js`里定义好目录结构，内容是一个值为字符串的数组，以 `/` 开头表示页面根目录，文件后边不需要加`.vue`扩展名  
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

`init-page`方法会自动生成一个包含所有页面链接的`dev.vue`文件，方便开发环境使用
```
npm run init-page
```

如果已经存在`/router/index.js`路由表文件，`init-router`方法会把旧文件备份为`index_bak.js`文件
```
npm run init-router
```




需要帮助请联系Quincy  
wx：likequincy

