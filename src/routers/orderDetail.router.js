const express = require('express')
const router = express.Router()
const passport = require('passport')

const OrderDetailService = require('../services/orderDetail.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createOrderDetailSchema, updateOrderDetailSchema, getOrderDetailSchema } = require('../schemas/orderDetail.schema')
const orderDetailService = new OrderDetailService()
const { checkRoles } = require('../middlewares/auth.handler')

// Endpoint: GET /ordersDetail
router.get('/',
  async (req, res, next) => {
    try {
      const result = await orderDetailService.find()
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: GET /ordersDetail/:id
router.get('/:id',
  validatorHandler(getOrderDetailSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await orderDetailService.findOne(id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: POST /ordersDetail
router.post('/',
  validatorHandler(createOrderDetailSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const body = req.body
      const result = await orderDetailService.create(body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: PUT /ordersDetail/:id
router.put('/:id',
  validatorHandler(getOrderDetailSchema, 'params'),
  validatorHandler(updateOrderDetailSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const result = await orderDetailService.update(id, body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: DELETE /ordersDetail/:id
router.delete('/:id',
  validatorHandler(getOrderDetailSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await orderDetailService.delete(id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
