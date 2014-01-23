var corpApp = angular.module('corpApp', ['ngRoute', 'corpApp.contact']);


//routing
corpApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
  
	corpApp.controller('HomeController', function($scope, $http) {
	
		$scope.test = "test";
		$scope.modules = ["contact", "expenses", "buddy"];
	 
	});
corpApp.controller('ModuleController', function($scope, $http) {
	
	$scope.test = "test";
	 
});