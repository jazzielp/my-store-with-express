const boom = require('@hapi/boom')

const checkApiKey = (req, res, next) => {
  const apikey = req.headers['api-key']
  if (apikey === '123456') {
    next()
  } else {
    next(boom.unauthorized())
  }
}

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user
    if (roles.includes(user.role)) {
      next()
    } else {
      next(boom.unauthorized())
    }
  }
}

module.exports = { checkApiKey, checkRoles }
