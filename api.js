// api request for LTA carpark availability data.
var express = require('express')
var router = express.Router()
var request = require('request')

var options = {
  url: 'http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailability',
  headers: {
    'accountkey': 'wX12O8DoTAuIZ9/3fMyKWQ==',
    'uniqueuserid': '438ffd3c-51ef-4ccb-bb52-aa7014a236fb',
    'accept': 'application/json'
  }
}

router.get('/api', (req, res) => {
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(body)
      var infoArray = info['value']
      res.send(infoArray)
    }
  })

})

module.exports = router
