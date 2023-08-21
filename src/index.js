const express = require('express')
const cors = require('cors')

const routerApi = require('./routers')
const { logError, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')
const { config } = require('./config/config')

const app = express()
const port = config.port

app.use(express.json())
app.use(cors())

require('./utils/auth')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

routerApi(app)

app.use(logError)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
