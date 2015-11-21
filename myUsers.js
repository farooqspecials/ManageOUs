angular.module('myApp', []).controller('userCtrl', function($scope,$http) {

function init(){
    	var apiUrl = "http://localhost:8080/api/organisationUnits.json";
	
    	// Cross-site redirect error solution: Run chrome with --disable-web-security
    	var base64 = "YWRtaW46ZGlzdHJpY3Q=";
	//$http.get(apiUrl, {headers: {'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='}}).	    	
	$http.get(apiUrl, {headers: {'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='}}).
    	success(function(data) {
	
	// $scope.users = [];
    	 $scope.users = data;
         alert('success');
    	}).
    	error(function(data, status, headers, config) {
    		alert("Error. Data: " + data);
    	});
    };
      
/*$scope.fName = '';
$scope.lName = '';
$scope.passw1 = '';
$scope.passw2 = '';
$scope.users = [
{id:1, fName:'Western Area', lName:"private" },
{id:2, fName:'Eastern Area',  lName:"simple" },
{id:3, fName:'Southern Area',  lName:"vip" },
{id:4, fName:'Northern Area', lName:"ordinary" },
{id:5, fName:'John', lName:"Doe" },
{id:6, fName:'Peter',lName:"Pan" }
];*/
     init();
     $scope.IsVisible = false;
   
                //If DIV is visible it will be hidden and vice versa.
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
