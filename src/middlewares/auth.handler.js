const boom = require('@hapi/boom')

const checkApiKey = (req, res, next) => {
  const apikey = req.headers['api-key']
  if (apikey === '123456') {
    next()
  } else {
    next(boom.unauthorized())
  }
}

module.exports = { checkApiKey }
