// var geo = require('mapbox-geocoding')

// api request for URA carpark availability data.
$(document).ready(function () {
  var settings = {
    'async': true,
    'crossDomain': true,
    'url': 'https://data.gov.sg/api/action/datastore_search?resource_id=5a8f7572-0d46-4ce5-be71-a7081d2c42b0',
    'method': 'GET',
    'headers': {
      'accept': 'application/json'
    }
  }
  $('button.get-data').click(function () {
    $.ajax(settings).done(function (response) {
      console.log(response)
    })
  })
})

  // geo.setAccessToken('pk.eyJ1IjoiZGF2aWZpZWQiLCJhIjoiY2lxYWoycnMwMDF2YWZxbTZqMWswaTBhZSJ9.YFUyoIivDGFBsxZSLW1erw')
  //
  // // Geocode an address to coordinates
  // geo.geocode('mapbox.places', 'Dam Square, Amsterdam', function (err, geoData) {
	//   console.log(geoData)
  // })
