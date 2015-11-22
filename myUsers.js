angular.module('myApp', ['ui.bootstrap']).controller('ApplicationController', function($scope,$http) {
 
   /* $scope.filters = {
        
        search: ''
    };
    
    $scope.actions = {
      function () {
           
                 $scope.filters.search = '';   
            
        }
    };*/
    
    
$scope.fName = '';
$scope.lName = '';
$scope.passw1 = '';
$scope.passw2 = '';
$scope.IsVisible = false;
   
                //If DIV is visible it will be hidden and vice versa.
               
init();           
    

function init(){
    	var apiUrl = "http://192.168.0.105:8082/api/organisationUnits.json?fields=%3Aidentifiable%2Ccoordinates%2Clevel%2CshortName%2Cparent&pageSize=2000";
		
    	// Cross-site redirect error solution: Run chrome with --disable-web-security
    	var base64 = "YWRtaW46ZGlzdHJpY3Q=";
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