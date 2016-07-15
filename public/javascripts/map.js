/* global $:false L:false*/
$(document).ready(function () {
  // making the map
  var mymap = L.map('mapid').setView([1.2981, 103.8498], 15)
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
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
    for (let i = 0; i < data.length; i++) {
      var lon = data[i].Longitude
      var lat = data[i].Latitude
      var lots = data[i].Lots
      var message = data[i].Development + ': ' + data[i].Lots + ' lots left'

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

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

  // popup on page load
  $('div.popup').show('slow', 1000)
  $('div.popup').click(function () {
    $(this).hide('slow')
  })
  var now = new Date()
  var nowString = now.toString().slice(0,21)

  $('div.bottom').append('Carpark availability as of ', nowString)

  getData()
})
