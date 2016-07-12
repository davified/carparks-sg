$(document).ready(function () {
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

// visualising the data
  var lat = 1.4055606511815117
  var lon = 103.77270741120161
  var size = 500
  var message = 'hello world'
  i = 0 // temporary i number
  // for (i = 0; i < carparks.length; i++) {
    // $('div#test').append(carparks[i].Development)

    // var lon = carparks[i].Longitude
    // var lat = carparks[i].Latitude
    // var size = carparks[i].Lots
    // var message = carparks[i].Development + ": " + carparks[i].Lots

    var intensity = size / 1

    var circle = L.circle([lat, lon], 500, {
      fillColor: 'darkblue',
      fillOpacity: intensity,
      stroke: false
    }).addTo(mymap)

    // circle.bindPopup("Heavy Traffic on TPE (towards SLE) at Punggol Rd Exit").openPopup();
    circle.bindPopup(message).openPopup()
  // }

  // testing if map.js works and if it's hooked up to index.html. answer: yes
  $('button.get-data').click(function () {
    alert('jquery works!')
  })
})
