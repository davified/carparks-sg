const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const api = require('./api')
const dotenv = require('dotenv')
dotenv.load()

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/api', api)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

// setting up the port
app.listen(port, function () {
  console.log(`express has started on port ${port}`)
})

/* standard error incantations */
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// ERROR HANDLERS
// development error handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})
