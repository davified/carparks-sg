const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const api = require('./api')
const ura = require('./ura')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('files'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/* index(map) views and api views */
app.use('/', api)
app.use('/', ura)

app.get('/', function (req, res) {
  res.render('index')
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

// error handlers

// development error handler
// will print stacktrace
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
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})
