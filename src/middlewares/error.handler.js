const { ValidationError } = require('sequelize')

const logError = (err, req, res, next) => {
  console.error(err)
  next(err)
}

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

const ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: err.name,
      errors: err.errors
    })
  }
  next(err)
}

module.exports = {
  logError,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
}
