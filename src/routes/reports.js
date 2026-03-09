const express = require('express')
const { execFile } = require('child_process')

const router = express.Router()

// GET /reports/ping?host=example.com
router.get('/ping', (req, res) => {
  const host = req.query.host || '127.0.0.1'

  // Only allow simple hostnames or IP addresses to prevent command injection
  const hostPattern = /^[a-zA-Z0-9\.\-:]+$/
  if (!hostPattern.test(host)) {
    return res.status(400).send('Invalid host parameter')
  }

  execFile('ping', ['-c', '1', host], (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr || err.message)
    res.type('text').send(stdout)
  })
})

module.exports = router
