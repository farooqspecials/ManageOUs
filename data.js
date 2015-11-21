
function init(){
    	var apiUrl = "http://193.157.207.12:8080/api/organisationUnits.json";

//192.168.0.105193.157.207.12
    	// Cross-site redirect error solution: Run chrome with --disable-web-security
    	var base64 = "YWRtaW46ZGlzdHJpY3Q=";
    	$.ajax(apiUrl, {headers: {'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='}}).
    	success(function(data) {
				alert('success');
    	}).
    	error(function(data, status, headers, config) {
    		alert("Error. Data: " + data);
    	});
    }

      function initialize() {
          var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          var labelIndex = 0;

        var mapCanvas = document.getElementById('map');
          var lat=new google.maps.LatLng(59.9500, 10.7500);
        var mapOptions = {
          center:lat,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
          var map = new google.maps.Map(mapCanvas, mapOptions)
        //adding click event
          google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });
//add marker
          addMarker(lat, map);

          function addMarker(lat, map) {

      
         var marker = new google.maps.Marker({
    position: lat,
    map: map,
             label: labels[labelIndex++ % labels.length],
    title: 'Hello World!'
  });
          }
        }
      google.maps.event.addDomListener(window, 'load', initialize);
        


