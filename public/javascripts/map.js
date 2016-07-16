/* global $ L */
$(document).ready(function () {
  // making the map
  var mymap = L.map('mapid').setView([1.2981, 103.8498], 15)
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '<a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    zoomControl: false,
    accessToken: 'pk.eyJ1IjoiZGF2aWZpZWQiLCJhIjoiY2lxYWoxMnF3MDF0Z2Z2bTZ6MHl3cWdiMyJ9.JhNjMNWSTxbGzp7ck3ahMA'
  }).addTo(mymap)

  // making ajax request to our own api
  function getData () {
    // data.empty()
    $.ajax({
      url: 'http://localhost:3000/api',
      type: 'GET',
      success: function (data) {
        visualiseData(data)
      }
    })
  }

  var circlesGroup = new L.FeatureGroup()

  //  DEFINE FUNCTION FOR VISUALISING ACTUAL DATA
  function visualiseData (data) {
    data.sort(function (b, a) {return (a.Development > b.Development) ? 1 : ((b.Development > a.Development) ? -1 : 0) })
    for (let i = 0; i < data.length; i++) {
      var lon = data[i].Longitude
      var lat = data[i].Latitude
      var lots = data[i].Lots
      var message = data[i].Development + ': ' + data[i].Lots + ' lots left'

      $('ul.dropdown-menu').prepend('<li class="carpark" name="' + data[i].Development + '" lon="' + data[i].Longitude + '" lat="' + data[i].Latitude + '" lots="' + data[i].Lots + '"><a href="#">' + data[i].Development + '</a></li>')

      var intensity = lots / 600

      if (lots > 100) {
        var circle = L.circle([lat, lon], 80, {
          fillColor: '#09AD83',
          fillOpacity: intensity,
          stroke: false,
          className: 'animate'
        })
        circle.bindPopup(message)
        circlesGroup.addLayer(circle)
      } else {
        circle = L.circle([lat, lon], 80, {
          fillColor: '#FF6A59',
          fillOpacity: 0.8,
          stroke: false,
          className: 'animate'
        })
        circle.bindPopup(message)
        circlesGroup.addLayer(circle)
      }
    }
    mymap.addLayer(circlesGroup)
  }

  // function removeAllMarkers () {
  //   mymap.removeLayer(circlesGroup)
  // }

  // popup on page load
  $('div.popup').show('slow')
  $('div.popup').click(function () {
    $(this).hide('slow')
  })

  $('.dropdown-menu').delegate('li', 'click', function () {
    carpark = $(this)
    const currentLat = carpark.attr('lat')
    const currentLon = carpark.attr('lon')
    const currentLots = carpark.attr('lots')
    const currentCarpark = carpark.attr('name')
    const message = currentCarpark + ': ' + currentLots + ' lots left'
    mymap.setView([currentLat, currentLon], 15)
    var circle = L.circle([currentLat, currentLon], 80, {
      fillColor: '#FFFFFF',
      fillOpacity: 0,
      stroke: false
    }).addTo(mymap)
    circle.bindPopup(message).openPopup()
  })

  // appending date and time at the bottom of the page
  var now = new Date()
  var nowString = now.toString().slice(0, 21)
  $('div.bottom').append('Carpark availability is accurate as of ', nowString, '<br> Data kindly provided by <a href="https://www.facebook.com/WeKeepYourWorldMoving/?fref=ts">LTA Data Mall</a>')

  // let's do this! making the ajax request and visualising the data returned
  getData()
})
