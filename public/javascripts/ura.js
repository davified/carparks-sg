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
      return response
    })
  })
})
// var cv = new SVY21();

// Computing SVY21 from Lat/Lon
// var lat = 1.2949192688485278;
// var lon = 103.77367436885834;
// var result = cv.computeSVY21(lat, lon);
// console.log(result);
//
// // Computing Lat/Lon from SVY21
// var resultLatLon = cv.computeLatLon(result.N, result.E);
// console.log(resultLatLon);
