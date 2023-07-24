const express = require('express')
const router = express.Router()
const passport = require('passport')

const CategoryService = require('../services/category.service')
const validatorHandler = require('../middlewares/validator.handler')
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema')
const categoryService = new CategoryService()
const { checkRoles } = require('../middlewares/auth.handler')

// Endpoint: GET /categories
router.get('/',
  async (req, res, next) => {
    try {
      const result = await categoryService.find()
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: GET /categories/:id
router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await categoryService.findOne(id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: POST /categories
router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const body = req.body
      const result = await categoryService.create(body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: PUT /categories/:id
router.put('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const result = await categoryService.update(id, body)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

// Endpoint: DELETE /categories/:id
router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await categoryService.delete(id)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
