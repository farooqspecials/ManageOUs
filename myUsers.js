angular.module('myApp', []).controller('userCtrl', function($scope) {
 
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
$scope.users = [
{id:1, fName:'Western Area', lName:"private" },
{id:2, fName:'Eastern Area',  lName:"simple" },
{id:3, fName:'Southern Area',  lName:"vip" },
{id:4, fName:'Northern Area', lName:"ordinary" },
{id:5, fName:'John', lName:"Doe" },
{id:6, fName:'Peter',lName:"Pan" }
];
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