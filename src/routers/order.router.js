const express = require('express')
const router = express.Router()
const passport = require('passport')

const OrderService = require('../services/order.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createOrderSchema, updateOrderSchema, getOrderSchema } = require('../schemas/order.schema')
const orderService = new OrderService()
const { checkRoles } = require('../middlewares/auth.handler')

// Endpoint: GET /orders
router.get('/',
  async (req, res, next) => {
    try {
      const result = await orderService.find()
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: GET /orders/:id
router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await orderService.findOne(id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: POST /orders
router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const body = req.body
      const result = await orderService.create(body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: PUT /orders/:id
router.put('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const result = await orderService.update(id, body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: DELETE /orders/:id
router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await orderService.delete(id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
