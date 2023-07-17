const express = require('express')
const router = express.Router()

const UserService = require('../services/user.service')
const userService = new UserService()

// Endpoint: GET /users
router.get('/', async (req, res, next) => {
  try {
    const result = await userService.find()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

// Endpoint: GET /users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await userService.findOne(id)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

// Endpoint: POST /users
router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const result = await userService.create(body)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

// Endpoint: PUT /users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const result = await userService.update(id, body)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

// Endpoint: DELETE /users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await userService.delete(id)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
