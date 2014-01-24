
var corpApp = angular.module('corpApp', ['ngRoute', 'corpApp.PeopleFinder', 'corpApp.departments']);
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
	
	$scope.color = function(i){
	
		color = {
			"0" : "regular",
			"1" : "medium",
			"2" : "dark",
			"3" : "light",
		};
				
		return color[i % 4];
	};

	$scope.modules = ["PeopleFinder", "expenses", "buddy", "departments"];
});
corpApp.controller('ModuleController', function($scope, $http) {
	
	$scope.test = "test";
	 
});