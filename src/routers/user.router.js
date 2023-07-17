const express = require('express')
const router = express.Router()

// Endpoint: GET /users
router.get('/', (req, res) => {
  res.send('GET /users')
})

// Endpoint: GET /users/:id
router.get('/:id', (req, res) => {
  res.send('GET /users/:id')
})

// Endpoint: POST /users
router.post('/', (req, res) => {
  res.send('POST /users')
})

// Endpoint: PUT /users/:id
router.put('/:id', (req, res) => {
  res.send('PUT /users/:id')
})

// Endpoint: DELETE /users/:id
router.delete('/:id', (req, res) => {
  res.send('DELETE /users/:id')
})

module.exports = router
