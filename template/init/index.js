const express = require('express')
const router = express.Router()

const initTool = require('./tool.js')

router.post('/', (req, res) => {
  res.send(initTool.msg)
})

module.exports = router
