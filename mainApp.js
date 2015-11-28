var app = angular.module('mainApp', ['ui.bootstrap']);
app.controller('MainController', function($scope, $http) {
  $http.get("http://localhost:8080/api/organisationUnits.json")
  .success(function (response) {
	  $scope.names = response.organisationUnits;
	  console.log(response.organisationUnits);
  });
});
