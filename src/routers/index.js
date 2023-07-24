const express = require('express')
const router = express.Router()

const userRouter = require('./user.router')
const authRouter = require('./auth.router')
const customerRouter = require('./customer.router')
const categoryRouter = require('./category.router')

const routerApi = (app) => {
  app.use('/api', router)
  router.use('/users', userRouter)
  router.use('/auth', authRouter)
  router.use('/customers', customerRouter)
  router.use('/categories', categoryRouter)
}

module.exports = routerApi
