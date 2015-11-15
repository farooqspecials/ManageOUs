var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.57, lng: 10.42},
    zoom: 8
  });
}