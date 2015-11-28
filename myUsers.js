angular.module('myApp', ['ui.bootstrap']).controller('ApplicationController', function($scope,$http) {
  
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
    	var apiUrl = "http://localhost:8080/api/organisationUnits.json?fields=:identifiable,coordinates,level,shortName,parent&pageSize=25&page="+$scope.currentPage+"&level="+$scope.ouLevel;
		
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
			   $scope.totalItems = response.pager.total ;
			   console.log(response.pager.total);
			  console.log(response.organisationUnits);
             
             
            var ctrl = this;
            
            ctrl.allOrgUnits = response.organisationUnits;
            console.log(ctrl.allOrgUnits)
            ctrl.cordss = []
            
                for (i = 0; i < ctrl.allOrgUnits.length; i++)
                    {
                         
    			if(ctrl.allOrgUnits[i].coordinates != undefined && ctrl.allOrgUnits[i].coordinates.length < 200)
                
                {
                   
                    
                    ctrl.cordss.push(new Array(ctrl.allOrgUnits[i].name, ctrl.allOrgUnits[i].coordinates.substring(1,ctrl.allOrgUnits[i].coordinates.length-1).split(",")));
                }
                    }

        
    		// Add the coordinates to the map.
    		addMarkers(ctrl.cordss);
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
    
    $scope.pageChanged = function() {
		init();
	};
	
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
    
$scope.closediv = function (){
    console.log("hey")
       
 $scope.IsVisible = false;
 
};

});
