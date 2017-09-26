const express = require('express')
const router = express.Router()

const initTool = require('./tool.js')

router.post('/', (req, res) => {
  initTool.initPages(req.body)
  res.send('init pages success')
})

module.exports = router
