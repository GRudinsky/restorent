const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { dbURI, port } = require('./config/environment')
const logger = require('./lib/logger')
const router = require('./config/Router')
const errorHandler = require('./lib/errorHandler')

mongoose.connect(dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Mongo connected'))

app.use(express.static(`${__dirname}/dist`)) //change frontend to localhost 4000

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)  //set proxy in webpack config dev server

app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.use(errorHandler)

app.listen(port, () => console.log(`Runing on port ${port}`))
