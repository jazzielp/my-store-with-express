const express = require('express')
const router = express.Router()
const passport = require('passport')

const CustomerService = require('../services/customer.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema')
const customerService = new CustomerService()
const { checkRoles } = require('../middlewares/auth.handler')

// Endpoint: GET /customers
router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    console.log('entra al router')
    try {
      const result = await customerService.find()
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: GET /customers/:id
router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await customerService.findOne(id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: POST /customers
router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const result = await customerService.create(body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: PUT /customers/:id
router.put('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const result = await customerService.update(id, body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: DELETE /customers/:id
router.delete('/:id',
  checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await customerService.delete(id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
