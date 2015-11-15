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
{id:1, fName:'Hege', lName:"Pege" },
{id:2, fName:'Kim',  lName:"Pim" },
{id:3, fName:'Sal',  lName:"Smith" },
{id:4, fName:'Jack', lName:"Jones" },
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

});