var fs = require('fs'),
  path = require('path');

// 用户配置信息

// 存放页面文件的目录
let basePath = './src/pages'
// 页面模板源文件
let originFile = './src/components/default.vue'
// 模板识别字符（被替换的字段）
let replaceName = /#pageName/
// 自定义的目录结构
let pageTable = require('./pages')
//放置router文件的目录位置及文件名
let routerFile = './src/router/index.js'

// 生成页面
let routerListDom = ''
if (!fs.existsSync(path.join(__dirname, '..', basePath))) {
  fs.mkdirSync(path.join(__dirname, '..', basePath))
}
pageTable.forEach((o, i) => {
  if (o !== '') {
    if (i === 0) {
      routerListDom += ('<li><router-link to="' + o + '">' + o + '</router-link></li>\r\n')
    } else {
      routerListDom += ('\t\t<li><router-link to="' + o + '">' + o + '</router-link></li>\r\n')
    }
    let obj = o.split('/')
    obj.pop()
    if (obj.length === 1) {
      createFromOrigin(o)
    } else {
      if (!fs.existsSync(path.join(__dirname, '..', basePath, obj.join('/')))) {
        fs.mkdirSync(path.join(__dirname, '..', basePath, obj.join('/')))
      }
      createFromOrigin(o)
    }
  }
})
let fileData = fs.readFileSync(originFile, 'utf-8').replace(replaceName, routerListDom)
fs.writeFileSync(basePath + '/dev.vue', fileData)

console.log('create page success!')

// 生成路由
let vueFileList = []
if (fs.existsSync(routerFile)) {
  let bakFile = routerFile.replace(/index\.js/, 'index_bak.js')
  fs.renameSync(routerFile, bakFile)
}

findFile(basePath).then(() => {
  let data = ''
  data += "import Vue from 'vue'\r\n"
  data += "import Router from 'vue-router'\r\n"
  data += "//import pages below\r\n"
  let routerList = []
  vueFileList.forEach((o, i) => {
    data += "import " + o.name + " from '" + o.path + "'\r\n"
    if (o.name === 'dev') {
      routerList.push((i === 0 ? '' : ' ') + "{\r\n\t\tpath: '/',\r\n\t\tname: '" + o.name + "',\r\n\t\tcomponent: " + o.name + "\r\n\t}")
    } else {
      routerList.push((i === 0 ? '' : ' ') + "{\r\n\t\tpath: '" + o.link + "',\r\n\t\tname: '" + o.name + "',\r\n\t\tcomponent: " + o.name + "\r\n\t}")
    }
  })
  data += "\nVue.use(Router)\r\n\n"
  data += "export default new Router({\r\n\troutes: [" + routerList + "]\r\n})\r\n"
  fs.writeFile(routerFile, data, err => {
    if (err) {
      console.error(err)
    } else {
      console.log('vue-router file created success!')
    }
  })
})

// 识别模块
let userModules = []
pageTable.forEach(o => {
  if (o !== '') {
    if (o.split('/').length > 2) {
      if (!userModules.includes(o.split('/')[1])) {
        userModules.push(o.split('/')[1])
      }
    }
  }
})

// 生成api模块
let apiFileAppend = '// 引入API模块\r\n'
let apiFileAppend2 = 'Object.assign(moduleAPI'
userModules.forEach(o => {
  createApiModule(o)
  apiFileAppend += `import * as ${o}API from './${o}'\r\n`
  apiFileAppend2 += `, ${o}API`
})
fs.writeFileSync('./src/api/index.js', fs.readFileSync('./src/api/index.js', 'utf-8').replace(/\/\/ 引入API模块/, apiFileAppend).replace(/Object\.assign\(moduleAPI/, apiFileAppend2))
console.log('api modules created success!')

// 生成vuex模块
let storeFileAppend = '// 引入vuex模块\r\n'
let storeFileAppend2 = 'modules: {\r\n'
userModules.forEach(o => {
  createStoreModule(o)
  storeFileAppend += `import ${o}Module from './modules/${o}'\r\n`
  storeFileAppend2 += `\t\t${o}Module,\r\n`
})
fs.writeFileSync('./src/store/index.js', fs.readFileSync('./src/store/index.js', 'utf-8').replace(/\/\/ 引入vuex模块/, storeFileAppend).replace(/modules: \{/, storeFileAppend2))
console.log('vuex modules created success!')

// 功能定义
function createFromOrigin(fileName) {
  let fileData = fs.readFileSync(originFile, 'utf-8').replace(replaceName, 'this is ' + fileName + ' page')
  fs.writeFileSync(basePath + fileName + '.vue', fileData)
}
async function findFile(p) {
  let files = await fs.readdirSync(p)
  for (let i = 0; i < files.length; i++) {
    if (files[i].split('.').length == 1) {
      await findFile(p + '/' + files[i])
    } else if (files[i].split('.')[1] === 'vue') {
      let n = {}
      if (p === basePath) {
        n.name = files[i].split('.')[0]
      } else {
        n.name = p.slice(basePath.length + 1).replace(/\//g, "_") + '_' + files[i].split('.')[0]
      }
      n.link = p.slice(basePath.length) + '/' + files[i].split('.')[0]
      n.path = "@/" + basePath.split('/').pop() + p.slice(basePath.length) + '/' + files[i].split('.')[0]
      vueFileList.push(n)
    }
  }
}

function createApiModule(fileName) {
  fs.writeFileSync('./src/api/' + fileName + '.js', fs.readFileSync('./src/api/module.js', 'utf-8').replace(/test/,fileName))
}

function createStoreModule(fileName) {
  fs.writeFileSync('./src/store/modules/' + fileName + '.js', fs.readFileSync('./src/store/modules/module.js', 'utf-8'))
}
