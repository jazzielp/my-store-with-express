const express = require('express')
const router = express.Router()

const UserService = require('../services/user.service')
const userService = new UserService()

// Endpoint: GET /users
router.get('/', async (req, res) => {
  const result = await userService.find()
  res.json(result)
})

// Endpoint: GET /users/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const result = await userService.findOne(id)
  res.json(result)
})

// Endpoint: POST /users
router.post('/', async (req, res) => {
  const body = req.body
  const result = await userService.create(body)
  res.json(result)
})

// Endpoint: PUT /users/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body
  const result = await userService.update(id, body)
  res.json(result)
})

// Endpoint: DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const result = await userService.delete(id)
  res.json(result)
})

module.exports = router
