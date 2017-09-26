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
fs.writeFileSync('./src/api/' + fileName + '.js', fs.readFileSync('./src/api/module.js', 'utf-8').replace(/test/g, fileName))
}

function createStoreModule(fileName) {
fs.writeFileSync('./src/store/modules/' + fileName + '.js', fs.readFileSync('./src/store/modules/module.js', 'utf-8'))
}

var tools = {
msg: 'test123'
}
module.exports = tools
