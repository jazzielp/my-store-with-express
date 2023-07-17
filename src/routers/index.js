const express = require('express')
const router = express.Router()

const userRouter = require('./user.router')

const routerApi = (app) => {
  app.use('/api', router)
  router.use('/users', userRouter)
}

module.exports = routerApi
