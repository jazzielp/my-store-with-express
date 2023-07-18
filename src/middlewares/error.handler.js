const logError = (err, req, res, next) => {
  console.error(err)
  next(err)
}

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.parent && err.parent.stack
  })
}

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = {
  logError,
  errorHandler,
  boomErrorHandler
}
