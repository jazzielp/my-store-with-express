const express = require('express')
const router = express.Router()
const passport = require('passport')

const ProductService = require('../services/product.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema')
const productService = new ProductService()
const { checkRoles } = require('../middlewares/auth.handler')

// Endpoint: GET /products
router.get('/',
  async (req, res, next) => {
    try {
      const result = await productService.find()
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: GET /products/:id
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await productService.findOne(id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: POST /products
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const body = req.body
      const result = await productService.create(body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: PUT /products/:id
router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const result = await productService.update(id, body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: DELETE /products/:id
router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await productService.delete(id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
