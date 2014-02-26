var carpoolModule = angular.module('corpApp.carpool', ['ngRoute','ngAutocomplete']);

//routing
carpoolModule.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/module/carpool', {
            templateUrl: 'module/carpool/list.html',
            controller: 'CarpoolController'
        }).
        when('/module/carpool/advanced', {
            templateUrl: 'module/carpool/advanced.html',
            controller: 'CarpoolController'
        })
    }
]);

//filters
carpoolModule.filter('carpoolFilter', function() {
  return function(input, location) {
    var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].from == location.from){
              out.push(input[i]);
          }

          if(input[i].to == location.to){
              out.push(input[i]);
           }
      }      
    return out;
  };
});

carpoolModule.controller('CarpoolController', function($scope, $http, $filter, config) {

	$scope.list = [];


	$scope.searchRide = function(){
		$http.get(config.API_URL + '/serviceCarpool').
		success(function(data, status, headers, config) {
			$scope.list = data;
			$scope.list = $filter('carpoolFilter')($scope.list, {from : $scope.fromLocation, to : $scope.toLocation});
		}).
		error(function(data, status, headers, config) {
			//$location.path("/");
		});
		
	};

	$scope.submitRide = function(){
		alert("From: "+$scope.fromLocation+"<br />To:"+$scope.toLocation);
	};

	$scope.goSimple = function(){
		window.location.href = "#/module/carpool";
	};
	$scope.goAdvanced = function(){
		window.location.href = "#/module/carpool/advanced";
	};
});