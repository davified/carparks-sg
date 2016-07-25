// api request for LTA carpark availability data.
var express = require('express')
var router = express.Router()
var request = require('request')
const dotenv = require('dotenv')
dotenv.load()

var options = {
  url: 'http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailability',
  headers: {
    'accountkey': process.env.ACCOUNTKEY,
    'uniqueuserid': process.env.UNIQUEUSERID,
    'accept': 'application/json'
  }
}

router.get('/', (req, res) => {
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(body)
      var infoArray = info['value']
      res.send(infoArray)
    }
  })
})

module.exports = router
