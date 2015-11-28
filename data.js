

     

$(document).ready(initialize);
//var circle;
var map;
//var blueMarker;
//var redMarker;
//var markers;

//var closestMarker;
/*var myPosition = new google.maps.Marker({
	position: new google.maps.LatLng(8.269720, -12.483215), // temporary position
	map: map,
	title: "My location",
	//icon: redMarker,
});*/

//Initializes the map.
function initialize() {

	// Initial options. Centers on Sierra Leone.
	var mapOptions = {
			center: { lat: 8.4494988, lng: -11.7868289},
			zoom: 8
	};
	// Creates the map.
	map = new google.maps.Map(document.getElementById("map"),
			mapOptions);

	// Setting listener for myPosition-listening.
/*	google.maps.event.addListener(map, 'mousemove', function(event) {
        mousePosition.setPosition(event.latLng);
	});*/
   /* var mousePosition = new google.maps.Marker({
	position: new google.maps.LatLng(8.2, -12.4),
	map: map,
});*/

}



function addMarkers(coordinates) {
	var marker;
    var infowindow;
	markers = [];
	infowindow = new google.maps.InfoWindow();
	//var customImage = 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png';

	for (i = 0; i < coordinates.length; i++) { 
		// Create and add a new marker per coordinate.
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(coordinates[i][1][1], coordinates[i][1][0]),
			map: map,
			title: coordinates[i][0],
			//icon: blueMarker,
			current: false,
		});

		markers.push(marker);

		// Add a listener to each marker, so that they will display the name of the facility when clicked.
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent("<div class='info'><h4>" + coordinates[i][0] + "</h4></div>");
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}