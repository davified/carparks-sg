/* jQuery */
$(document).ready(function () {
// making the map
  var mymap = L.map('mapid').setView([1.2981, 103.8498], 15)

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    accessToken: 'pk.eyJ1IjoiZGF2aWZpZWQiLCJhIjoiY2lxYWoxMnF3MDF0Z2Z2bTZ6MHl3cWdiMyJ9.JhNjMNWSTxbGzp7ck3ahMA'
  }).addTo(mymap)

  getData()

// fancy cool watercolor basemap
  // L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  //   attribution: 'Map tiles by <a href="https://stamen.com">Stamen Design</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //   subdomains: 'abcd',
  //   minZoom: 1,
  //   maxZoom: 18,
  //   ext: 'png'
  // }).addTo(mymap)

  // making ajax to our own api
  function getData() {
    $.ajax({
      url: 'http://localhost:3000/api',
      type: 'GET',
      success: function (data) {
        visualiseData(data)
      }
    })
  }

    //  DEFINE FUNCTION FOR VISUALISING ACTUAL DATA
    function visualiseData(data) {
      // var lon = 0
      // var lat = 0
      // var lots = 0
      // var message = ''

      for (i = 0; i < data.length; i++) {
        // if (circle && data.length === i) circle.removeFrom(mymap)
        var lon = data[i].Longitude
        var lat = data[i].Latitude
        var lots = data[i].Lots
        var message = data[i].Development + ": " + data[i].Lots + " lots left"

        var intensity = lots / 600

        if (lots > 20) {
          var circle = L.circle([lat, lon], 100, {
            fillColor: '#00387F',
            fillOpacity: intensity,
            stroke: false,
            className: 'animate'
          }).addTo(mymap)
        } else {
          var circle = L.circle([lat, lon], 100, {
            fillColor: 'red',
            fillOpacity: 0.8,
            stroke: false,
            className: 'animate'
          }).addTo(mymap)
        }
        circle.bindPopup(message)
      }
    }

    $('button.get-data').click(function() {
      getData()
      console.log('refreshed!')
    })
})
