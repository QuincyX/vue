# vue-cli模板

> A Vue.js project template by Quincy 

## 使用方法

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

`init-page`方法会自动生成一个包含所有页面链接的`dev.vue`文件

### 使用方法
``` bash
# 依据./init/pages.js的信息自动生成vue目录结构
npm run init-page

# 依据./src/page/目录自动生成路由表文件
npm run init-router

# 安装依赖
npm i 
cnpm i

# 开发环境 localhost:8080
npm run dev

# 打包
npm run build

```

需要帮助请联系Quincy  
wx：likequincy

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
