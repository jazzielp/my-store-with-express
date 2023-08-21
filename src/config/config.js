const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: '.production.env'
  })
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: '.development.env'
  })
} else {
  dotenv.config({
    path: '.test.env'
  })
}

const config = {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JTW_SECRET
}

console.log(config)

module.exports = { config }
