const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

const routerApi = require('./routers')
const { logError, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')
const { config } = require('./config/config')

const app = express()
const port = config.port

// swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API'
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/swagger.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// middlewares
// .............................................
app.use(express.json())
app.use(cors())

require('./utils/auth')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// routes
routerApi(app)

// error handlers
app.use(logError)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

// server
const server = app.listen(port, () => {
  console.log('Server is running on port ' + port)
})

module.exports = { app, server }
