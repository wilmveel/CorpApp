
var corpApp = angular.module('corpApp', ['ngRoute', 'corpApp.PeopleFinder', 'corpApp.departments', 'corpApp.presentation']);
//routing
corpApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      }).
	  when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
  
corpApp.controller('LoginController', function($scope, $http) {
	
});

corpApp.controller('HomeController', function($scope, $http) {
		
	$scope.color = function(i){
	
		color = {
			"0" : "regular",
			"1" : "medium",
			"2" : "dark",
			"3" : "light",
		};
				
		return color[i % 4];
	};

	$scope.modules = ["PeopleFinder", "expenses", "buddy", "departments", "presentation"];
});

corpApp.controller('ModuleController', function($scope, $http) {
	
	$scope.test = "test";
	 
});