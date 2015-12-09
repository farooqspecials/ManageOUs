

     

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
   google.maps.event.addListener(map, "rightclick",function(event){showContextMenu(event.latLng);});
}

var	markers = [];
function addMarkers(coordinates) {
	var marker;
    var infowindow;
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

function clearMarkers() {
	 for (var i = 0; i < markers.length; i++ ) {
		markers[i].setMap(null);
     }
	markers.length = 0;
}
var longitude;
var latitude;
function showAlert() {

	 $('#addMapOU').modal('show');
	 $('.contextmenu').css("display","none");
}

function showContextMenu(caurrentLatLng  ) {
	console.log(caurrentLatLng);
	 var projection;
	 var contextmenuDir;
	 projection = map.getProjection() ;
	 $('.contextmenu').remove();
	  latitude = caurrentLatLng.lat();
	  longitude =  caurrentLatLng.lng();
	  contextmenuDir = document.createElement("div");
	   contextmenuDir.className  = 'contextmenu';
	   contextmenuDir.innerHTML = '<a onclick="showAlert()" id="menu1"><div>Add Facility here<\/div><\/a>'
	   //scontextmenuDir.innerHTML = '<ul id="contextMenu" class="dropdown-menu" ><li><a tabindex="-1" href="#">Action</a></li></ul>';
	 $(map.getDiv()).append(contextmenuDir);
	 setMenuXY(caurrentLatLng);
	 contextmenuDir.style.visibility = "visible";
}
function getCanvasXY(caurrentLatLng){
	var scale = Math.pow(2, map.getZoom());
	var nw = new google.maps.LatLng(
	  map.getBounds().getNorthEast().lat(),
	  map.getBounds().getSouthWest().lng()
	);
	var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
	var worldCoordinate = map.getProjection().fromLatLngToPoint(caurrentLatLng);
	var caurrentLatLngOffset = new google.maps.Point(
	  Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
	  Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
	);
	return caurrentLatLngOffset;
}
function setMenuXY(caurrentLatLng){
	 var mapWidth = $('#map_canvas').width();
	 var mapHeight = $('#map_canvas').height();
	 var menuWidth = $('.contextmenu').width();
	 var menuHeight = $('.contextmenu').height();
	 var clickedPosition = getCanvasXY(caurrentLatLng);
	 var x = clickedPosition.x ;
	 var y = clickedPosition.y ;

	  if((mapWidth - x ) < menuWidth)//if to close to the map border, decrease x position
		  x = x - menuWidth;
	 if((mapHeight - y ) < menuHeight)//if to close to the map border, decrease y position
		 y = y - menuHeight;

	 $('.contextmenu').css('left',x  );
	 $('.contextmenu').css('top',y );
};