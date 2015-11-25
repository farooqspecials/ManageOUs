var app = angular.module('mainApp', ['ui.bootstrap']);
app.controller('MainController', function($scope, $http) {
  $http.get("http://192.168.0.105:8082/api/organisationUnits.json")
  .success(function (response) {
	  $scope.names = response.organisationUnits;
	  console.log(response.organisationUnits);
  });
});
