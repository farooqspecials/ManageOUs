angular.module('myApp', ['ui.bootstrap']).controller('ApplicationController', function($scope,$http) {
  
$scope.fName = '';
$scope.lName = '';
$scope.passw1 = '';
$scope.passw2 = '';
$scope.IsVisible = false;
   
                //If DIV is visible it will be hidden and vice versa.
               
init();    


function init(){
    	var apiUrl = "http://localhost:8080/api/organisationUnits.json?fields=:identifiable,coordinates,level,shortName,parent&pageSize=2000";
		
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
			  $scope.names = response.organisationUnits;
			  console.log(response.organisationUnits);
		  });
    } 
    
    
    
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
        
        appctrl.currentOrgType = appctrl.levelOptions[2];
    }
    
     $scope.levelCD=function(){
        
        appctrl.currentOrgType = appctrl.levelOptions[0];
    }
    
     $scope.levelD=function(){
        
        appctrl.currentOrgType = appctrl.levelOptions[1];
    }
      $scope.levelF=function(){
        
        appctrl.currentOrgType = appctrl.levelOptions[3];
    }

    
    $scope.editUser = function(id) {
    
    $scope.IsVisible = true;
    
    
    $scope.fName = $scope.users[id-1].fName;
    $scope.lName = $scope.users[id-1].lName; 
    
     
    
  
};
    
$scope.closediv = function (){
    console.log("hey")
       
 $scope.IsVisible = false;
 
};

});
