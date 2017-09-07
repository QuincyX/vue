var fs = require('fs'),
path = require('path');

//user config below
//页面文件根目录
let basePath = './src/pages'
//放置router文件的目录位置及文件名
let routerFile = './src/router/index.js'

let basePathAlias = path.join(__dirname, '..', basePath)
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

findFile(basePath).then(() => {
let data = ''
data += "import Vue from 'vue'\r\n"
data += "import Router from 'vue-router'\r\n"
data += "//import pages below\r\n"
let routerList = []
vueFileList.forEach((o, i) => {
  data += "import " + o.name + " from '" + o.path + "'\r\n"
  routerList.push((i === 0 ? '' : ' ') + "{\r\n\t\tpath: '" + o.link + "',\r\n\t\tname: '" + o.name + "',\r\n\t\tcomponent: " + o.name + "\r\n\t}")
})
data += "\nVue.use(Router)\r\n\n"
data += "export default new Router({\r\n\troutes: [" + routerList + "]\r\n})\r\n"
fs.writeFile(routerFile, data, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('vue-router file created success!');
  }
});
})
