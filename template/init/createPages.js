var fs = require('fs'),
path = require('path');

//user config below
// 存放页面文件的根目录
let basePath = './src/pages2'
// 模板源文件
let originFile = './src/pages/addon/default.vue'
// 生成的目录结构
let fileTable = [
'/page0', 
'/main', 
'/dir/page1', 
'/dir/page2', 
'/dir2/page3', 
'/dir2/page4', 
'/dir2/dirr2/page5', 
'/dir2/dirr2/page6'
]

function createFromOrigin(fileName) {
fs.writeFileSync(basePath + fileName + '.vue', fs.readFileSync(originFile))
}

fileTable.forEach(o => {
let obj = o.split('/')
obj.pop()
if (obj.length === 1) {
  createFromOrigin(o)
} else {
  if(!fs.existsSync(path.join(__dirname, '..', basePath, obj.join('/')))){
    fs.mkdirSync(path.join(__dirname, '..', basePath, obj.join('/')))
  }
  createFromOrigin(o)
}
})
