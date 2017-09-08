var fs = require('fs'),
  path = require('path');
//user config below
// 存放页面文件的目录
let basePath = './src/pages'
// 模板源文件
let originFile = './src/components/default.vue'
// 生成的目录结构
let pageTable = require('./pages')
let routerListDom = ''

function createFromOrigin(fileName) {
  let fileData = fs.readFileSync(originFile, 'utf-8').replace(/#pageName/, 'this is ' + fileName + ' page')
  fs.writeFileSync(basePath + fileName + '.vue', fileData)
}

if (!fs.existsSync(path.join(__dirname, '..', basePath))) {
  fs.mkdirSync(path.join(__dirname, '..', basePath))
}

pageTable.forEach((o, i) => {
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
})

let fileData = fs.readFileSync(originFile, 'utf-8').replace(/#pageName/, routerListDom)
fs.writeFileSync(basePath + '/dev.vue', fileData)

console.log('create page success!')
