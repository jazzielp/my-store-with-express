const express = require('express')
const cors = require('cors')

const routerApi = require('./routers')
const { logError, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

routerApi(app)

app.use(logError)
app.use(ormErrorHandler)
app.use(errorHandler)
app.use(boomErrorHandler)

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
