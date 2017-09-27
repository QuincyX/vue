const express = require('express')
const router = express.Router()

const initTool = require('./tool.js')

router.post('/', (req, res) => {
  let thisModules = req.body.pages.map(o => {
    if (o.module !== '/') {
      return o.module
    }
  })
  if (req.body.api) {
    initTool.initApi(thisModules)
  }
  if (req.body.vuex) {
    initTool.initVuex(thisModules)
  }
  if (req.body.router) {
    initTool.initRouter()
  }
  initTool.initPages(req.body.pages)
  res.send('init pages success')
})

module.exports = router
