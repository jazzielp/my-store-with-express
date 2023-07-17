const express = require('express')
const routerApi = require('./routers')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

routerApi(app)

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
