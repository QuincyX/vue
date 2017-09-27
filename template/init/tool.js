var fs = require('fs'),
path = require('path');

// 用户配置信息

// 存放页面文件的目录
let basePath = './src/pages'
// 页面模板源文件
let originFile = './src/components/default.vue'
// 模板识别字符（被替换的字段）
let replaceName = /#pageName/
//放置router文件的目录位置及文件名
let routerFile = './src/router/index.js'

// 生成页面


// 功能定义
function createVueFileFromOrigin(fileName) {
let fileData = fs.readFileSync(originFile, 'utf-8').replace(replaceName, 'this is ' + fileName + ' page')
fs.writeFileSync(basePath + fileName + '.vue', fileData)
}

function createApiModule(fileName) {
fs.writeFileSync('./src/api/' + fileName + '.js', fs.readFileSync('./src/api/module.js', 'utf-8').replace(/test/g, fileName))
}

function createStoreModule(fileName) {
fs.writeFileSync('./src/store/modules/' + fileName + '.js', fs.readFileSync('./src/store/modules/module.js', 'utf-8'))
}

let vueFileList = []
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

module.exports = {
initPages: para => {
  if (!fs.existsSync(path.join(__dirname, '..', basePath))) {
    fs.mkdirSync(path.join(__dirname, '..', basePath))
  }
  para.forEach(o => {
    if (o.module === '/') {
      o.pages.forEach(v => {
        createVueFileFromOrigin('/' + v.name)
        console.log('create ' + v.name + ' success')
      })
    } else {
      fs.mkdirSync(path.join(__dirname, '..', basePath, ('/' + o.module)))
      o.pages.forEach(v => {
        createVueFileFromOrigin('/' + o.module + '/' + v.name)
        console.log('create ' + v.name + ' success')
      })
    }
  })
},
initRouter: para => {
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
      if (o.name === 'main') {
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
},
initApi: para => {
  let apiFileAppend = '// 引入API模块\r\n'
  let apiFileAppend2 = 'Object.assign(initAPI'
  para.forEach(o => {
    if (!fs.existsSync(`./src/api/${o}.js`)) {
      createApiModule(o)
      apiFileAppend += `import * as ${o}API from './${o}'\r\n`
      apiFileAppend2 += `, ${o}API`
    }
  })
  fs.writeFileSync('./src/api/index.js', fs.readFileSync('./src/api/index.js', 'utf-8').replace(/\/\/ 引入API模块/, apiFileAppend).replace(/Object\.assign\(initAPI/, apiFileAppend2))
},
initVuex: para => {
  let storeFileAppend = '// 引入vuex模块\r\n'
  let storeFileAppend2 = 'modules: {\r\n'
  para.forEach(o => {
    if (!fs.existsSync(`./src/store/modules/${o}.js`)) {
      createStoreModule(o)
      storeFileAppend += `import ${o}Module from './modules/${o}'\r\n`
      storeFileAppend2 += `\t\t${o}Module,\r\n`
    }
  })
  fs.writeFileSync('./src/store/index.js', fs.readFileSync('./src/store/index.js', 'utf-8').replace(/\/\/ 引入vuex模块/, storeFileAppend).replace(/modules: \{/, storeFileAppend2))
}
}
