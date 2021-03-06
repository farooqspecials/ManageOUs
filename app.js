angular.module('myApp', ['ui.bootstrap','smart-table']).controller('ApplicationController', function($scope,$http) {
  
$scope.fName = '';
$scope.lName = '';
$scope.passw1 = '';
$scope.passw2 = '';
$scope.IsVisible = false;
$scope.currentPage = 1;   
$scope.pageSize = 25;
$scope.records = [];   
$scope.ouLevel = 4;   
                //If DIV is visible it will be hidden and vice versa.
               
init();    
function init(){
		var apiUrl = "http://localhost:8080/api/organisationUnits.json?fields=:identifiable,coordinates,level,shortName,parent&paging=false&level="+$scope.ouLevel;
		
    	// Cross-site redirect error solution: Run chrome with --disable-web-security
    	//var base64 = "YWRtaW46ZGlzdHJpY3Q=";
    	/*
		$http.get(apiUrl, {headers: {'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='}}).
    	success(function(data) {
			console.log(data.organisationUnits);
				$scope.orgUnits = data.organisationUnits;
    	}). 
    	error(function(data, status, headers, config) {
    		alert("Error. Data: " + data);
    	});
		*/
		$http.get(apiUrl)
		  .success(function (response) {
			  angular.copy(response.organisationUnits, $scope.records);
			  // $scope.totalItems = response.pager.total ;
            
             var ctrl = this;
            ctrl.allOrgUnits = response.organisationUnits;
            $scope.allOrgUnits = response.organisationUnits;
			$scope.displayedUnits = [].concat($scope.allOrgUnits);
			
            ctrl.cordss = []; 
            for (i = 0; i < ctrl.allOrgUnits.length; i++) {
               if(ctrl.allOrgUnits[i].coordinates != undefined && ctrl.allOrgUnits[i].coordinates.length < 200) {
				   ctrl.cordss.push(new Array(ctrl.allOrgUnits[i].name, ctrl.allOrgUnits[i].coordinates.substring(1,ctrl.allOrgUnits[i].coordinates.length-1).split(",")));
                }
            }
			
    		// Add the coordinates to the map.
    		addMarkers(ctrl.cordss);
		  });
		  
		  $http.get("http://localhost:8080/api/organisationUnits.json?fields=:identifiable,coordinates,level,shortName,parent&paging=false&level=3")
		  .success(function (response) {
				$scope.LevelThreeUnits = response.organisationUnits;
				this.LevelThreeUnits = response.organisationUnits;
		  });
    } 
    $scope.$watch('displayedUnits', function(newVal, oldVal){
		clearMarkers();
		if(typeof newVal != 'undefined') {
			console.log(newVal);
			var cords = [];
			for (i = 0; i < newVal.length; i++) {
               if(newVal[i].coordinates != undefined && newVal[i].coordinates.length < 200) {
				   cords.push(new Array(newVal[i].name, newVal[i].coordinates.substring(1,newVal[i].coordinates.length-1).split(",")));
                }
            }
			
			addMarkers(cords);
		}
	});
    
    var appctrl = this;
	appctrl.levelOptions = [{name:'ChiefDom', level:1},{name:'District', level:2},{name:'Organisation Unit', level:3}, 	                         {name:'Facility', level:4}];
    
    // Default is Facility.
	appctrl.currentOrgType = appctrl.levelOptions[3];
    
   
    // A custom filter for the ng-repeat.
	$scope.customFilter = function(name) {
		// Custom filter. Currently filtering:
		// - By level.
		// - Query.

		return function(orgUnit) {
			return (orgUnit.level == appctrl.currentOrgType.level)
               // && orgUnit.name.indexOf(appctrl.currentQuery) != -1);
		}
	}  	
    $scope.levelOU=function(){
		$scope.ouLevel = 3;   
		appctrl.currentOrgType = appctrl.levelOptions[2];
        init();  
     //   appctrl.currentOrgType = appctrl.levelOptions[2];
    }
    
     $scope.levelCD=function(){
		$scope.ouLevel = 1;   
		appctrl.currentOrgType = appctrl.levelOptions[0];
        init();


   //     appctrl.currentOrgType = appctrl.levelOptions[0];
    }
    
     $scope.levelD=function(){
		$scope.ouLevel = 2;   
		appctrl.currentOrgType = appctrl.levelOptions[1];
        init();


  //      appctrl.currentOrgType = appctrl.levelOptions[1];
    }
      $scope.levelF=function(){
  		$scope.ouLevel = 4;   
		appctrl.currentOrgType = appctrl.levelOptions[3];
        init();


//        appctrl.currentOrgType = appctrl.levelOptions[3];
    }

    
    $scope.editUser = function(id) {
    
    $scope.IsVisible = true;
    
    
    $scope.fName = $scope.users[id-1].fName;
    $scope.lName = $scope.users[id-1].lName; 
    
     
    
  
};
$scope.parentUnit = {};
$scope.showInsertForm = function(code,level,id,name,href) {
   $scope.parentUnit.code= code;
   $scope.parentUnit.level= level;
   $scope.parentUnit.id= code;
   $scope.parentUnit.name= name;
   $scope.parentUnit.href= href;
   console.log($scope.parentUnit);
   $('#addOU').modal('show');
  }
$scope.addOrgUnit = function(unit) {
		var level = $scope.parentUnit.level <= 3 ? $scope.parentUnit.level+ 1 : 4;
		var unitData = {
				"name":unit.name,
				"shortName":unit.shortName,
                "level": level,
				"openingDate": new Date(),
                //"coordinates": coords,
                //"coordinates": [testCtrl.currentLng, testCtrl.currentLat],
                "parent":{"code" : $scope.parentUnit.code, "level" : $scope.parentUnit.level, "id" : $scope.parentUnit.id, "name": $scope.parentUnit.name, "href": $scope.parentUnit.href}
				//"parent": {"id": $scope.parentUnit.id, "name":$scope.parentUnit.name, "code:"$scope.parentUnit.code,"href:"$scope.parentUnit.href}
		};
		console.log(unitData);
			var request = $http( {
			method: "post",
			url: "http://localhost:8080/api/organisationUnits/",
			data: unitData,
			headers: {
				'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q=',
				'Content-Type': 'application/json'
			},
		});

		// Perform request
		request.success(function(data) {
            console.log("after adding data");
			console.log(data);
			alert("Org Unit added successfully");
			init();
		});
		
		 $('#addOU').modal('hide');
}
$('#addOU').on('show.bs.modal', function (event) {

  var modal = $(this);
  if($scope.parentUnit.level <= 3) {
	  modal.find('#parentUnitName').val($scope.parentUnit.name);
	  modal.find('#unitLevel').val($scope.parentUnit.level + 1);
  } else {
	  modal.find('#unitLevel').val(4);
  }
});
$scope.currentUnit = {};

$scope.showEditableForm = function(code,level,id,name,href,shortName,createdDate,coordinates) {
   $scope.currentUnit.code= code;
   $scope.currentUnit.level= level;
   $scope.currentUnit.id= id;
   $scope.currentUnit.name= name;
   $scope.currentUnit.href= href;
   $scope.currentUnit.shortName= shortName;
   $scope.currentUnit.createdDate= createdDate;
   if(typeof coordinates != 'undefined' && level == 4) {
	    $scope.currentUnit.newlongitude = coordinates.substring(1,coordinates.length-1).split(",")[0];
		$scope.currentUnit.latitude = coordinates.substring(1,coordinates.length-1).split(",")[1];
   }
   $('#editOU').modal('show');
  }
$('#editOU').on('show.bs.modal', function (event) {
  var modal = $(this);
  modal.find('#currentUnitName').val($scope.currentUnit.name);
  modal.find('#currentUnitShortName').val($scope.currentUnit.shortName);

  if($scope.currentUnit.level != 4) {
	   modal.find('#coordinatesDiv').css("display","none");
  } else if($scope.currentUnit.level == 4 && typeof $scope.currentUnit.coordinates != 'undefined'){
	  modal.find('#longitude').val($scope.currentUnit.newlongitude);
	  modal.find('#latitude').val($scope.currentUnit.latitude);
	  modal.find('#coordinatesDiv').css("display","");
  }
});
$scope.updateOrgUnit = function(currentUnit) {

		currentUnit.openingDate = $scope.currentUnit.createdDate;
		if($scope.currentUnit.level == 4) {
			currentUnit.coordinates = "[" + currentUnit.newlongitude+ "," + $scope.currentUnit.latitude + "]"
		}
		var request = $http({
			method: "put",
			url: "http://localhost:8080/api/organisationUnits/" + currentUnit.id,
			data: currentUnit,
		});

		// Perform request
		request.success(function(data) {
			alert("Unit is successfully updated");
			console.log("after update");
			console.log(data);
            init(); 
		}).error(function(data, status) {
			alert("Update error");
		});

		 $('#editOU').modal('hide');
}

$('#addMapOU').on('show.bs.modal', function (event) {

  var modal = $(this);
  modal.find('#unitLevel').val(4);
  modal.find('#longitude').val(longitude);
  modal.find('#latitude').val(latitude);

});
$scope.addFacility = function(unit) {
	var parentUnit;
	for (i = 0; i < this.LevelThreeUnits.length; i++) {
		if(this.LevelThreeUnits[i].name == unit.parentName) {
			parentUnit = this.LevelThreeUnits[i];
		}
	}
	var unitData = {
				"name":unit.name,
				"shortName":unit.shortName,
                "level": unit.level,
				"openingDate": new Date(),
                //"coordinates": coords,
                "coordinates": "[" + longitude + "," + latitude + "]" ,
                "parent":{"code" : parentUnit.code, "level" : parentUnit.level, "id" : parentUnit.id, "name": parentUnit.name, "href": parentUnit.href}
				//"parent": {"id": $scope.parentUnit.id, "name":$scope.parentUnit.name, "code:"$scope.parentUnit.code,"href:"$scope.parentUnit.href}
		};
		console.log(unitData);
			var request = $http( {
			method: "post",
			url: "http://localhost:8080/api/organisationUnits/",
			data: unitData,
			headers: {
				'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q=',
				'Content-Type': 'application/json'
			},
		});

		// Perform request
		request.success(function(data) {
            console.log("after adding data");
			console.log(data);
			alert("Org Unit added successfully");
			init();
		});
		
		 $('#addMapOU').modal('hide');
		
}
$scope.closediv = function (){
    console.log("hey")
       
 $scope.IsVisible = false;
 
};

$scope.locateUnitOnMap = function(unitName) {
	for (var i = 0; i < markers.length; i++ ) {
		if(unitName == markers[i].getTitle()) {
			new google.maps.event.trigger( markers[i], 'click' );
			return false;
		}
		console.log(markers[i].getTitle());
     }
	 alert('Co-ordinate for this facility not found');
}
}).directive('stRatio', function() {
    return {
      link: function(scope, element, attr) {
        var ratio = +(attr.stRatio);
        element.css('width', ratio + '%');

      }
    };
  }).directive('pageSelect', function() {
      return {
        restrict: 'E',
        template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
        link: function(scope, element, attrs) {
          scope.$watch('currentPage', function(c) {
            scope.inputPage = c;
          });
        }
      }
    })
                ;;
