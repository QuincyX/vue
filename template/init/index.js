const express = require('express')
const router = express.Router()

const initTool = require('./tool.js')

router.post('/', (req, res) => {
  initTool.initPages(req.body.pages)
  let thisModules = req.body.pages.map(o => {
    return o.module
  })
  thisModules.shift()
  if (thisModules.length) {
    if (req.body.api) {
      initTool.initApi(thisModules)
    }
    if (req.body.vuex) {
      initTool.initVuex(thisModules)
    }
  }
  if (req.body.router) {
    initTool.initRouter()
  }
  if (req.body.isEle) {
    // initTool.initRouter()
  }
  if (req.body.isPug) {
    // initTool.initRouter()
  }
  res.send('init pages success')
})

module.exports = router
