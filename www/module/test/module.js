var contactModule = angular.module('corpApp.test', ['ngRoute']);

//routing
contactModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/test', {
			templateUrl: 'module/test/list.html',
			controller: 'TestController'
		});
	}
]);

contactModule.controller('TestController', function($scope, $http) {

	$scope.output = "Wereld";
	
	$scope.update = function(){
		$scope.output = $scope.value
	}
	
	$http.get("http://turfje.nl/corpapp/serviceLinkedin").success(function(piet){
		$scope.output = piet[0].corpkey;
	});
 
});