var fs = require('fs'),
  path = require('path');

//user config below
// 存放页面文件的目录
let basePath = './src/pages'
// 模板源文件
let originFile = './src/components/default.vue'
// 生成的目录结构
let pageTable = require('./pages')

function createFromOrigin(fileName) {
  fs.writeFileSync(basePath + fileName + '.vue', fs.readFileSync(originFile))
}

if (!fs.existsSync(path.join(__dirname, '..', basePath))) {
  fs.mkdirSync(path.join(__dirname, '..', basePath))
}

pageTable.forEach((o,i) => {
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
  if(i===pageTable.length-1){
    console.log('create page success!')
  }
})
