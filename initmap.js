var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 8.4494988, lng: -11.786828},
    zoom: 8
  });
}

$('.selectpicker').selectpicker({
      style: 'btn-info',
      size: 4
  });