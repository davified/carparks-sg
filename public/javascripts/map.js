/* jQuery */
$(document).ready(function () {
// making the map
  var mymap = L.map('mapid').setView([1.3521, 103.8198], 12)

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    accessToken: 'pk.eyJ1IjoiZGF2aWZpZWQiLCJhIjoiY2lxYWoxMnF3MDF0Z2Z2bTZ6MHl3cWdiMyJ9.JhNjMNWSTxbGzp7ck3ahMA'
  }).addTo(mymap)

// fancy cool watercolor basemap
  // L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  //   attribution: 'Map tiles by <a href="https://stamen.com">Stamen Design</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //   subdomains: 'abcd',
  //   minZoom: 1,
  //   maxZoom: 12,
  //   ext: 'png'
  // }).addTo(mymap)

  // making ajax to our own api
    $('button.get-data').click(function () {
      $.ajax({
        url: 'http://localhost:3000/api',
        type: 'GET',
        success: function (data) {
          for (i = 0; i < data.length; i++) {
            $('div#test').append(data[i].Development)

            var lon = data[i].Longitude
            var lat = data[i].Latitude
            var lots = data[i].Lots
            var message = data[i].Development + ": " + data[i].Lots

            var intensity = lots / 500

            var circle = L.circle([lat, lon], 100, {
              fillColor: 'darkblue',
              fillOpacity: intensity,
              stroke: false
            }).addTo(mymap)

            circle.bindPopup(message).openPopup()
          }
        }
      })
    })
})
