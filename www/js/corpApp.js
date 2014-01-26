
var corpApp = angular.module('corpApp', ['ngRoute', 'corpApp.PeopleFinder', 'corpApp.departments', 'corpApp.presentation', 'corpApp.profile', 'corpApp.expenses', 'corpApp.coach']);
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
        redirectTo: '/login'
      });
  }]);
  
corpApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
  
corpApp.controller('LoginController', function($scope, $http, Loginservice) {
	
	$scope.login = function(){
		Loginservice.username = $scope.username;
	};
	
});

corpApp.service('Loginservice', function () {

    var username;

});

corpApp.controller('HomeController', function($scope, $http, Loginservice) {
		
	$scope.color = function(i){
	
		color = {
			"0" : "color0",
			"1" : "color1",
			"2" : "color2",
			"3" : "color3",
		};
				
		return color[i % 4];
	};

	$scope.modules = ["PeopleFinder", "expenses", "coach", "departments", "presentation"];
	
	$http({method: 'GET', url: 'http://192.168.101.192:8080/searchcontact/' + Loginservice.username}).
	success(function(data, status, headers, config) {
		// this callback will be called asynchronously
		// when the response is available
		$scope.item = data[0];

	}).
	error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		$scope.list = {};
			alert("Error");
	});
});

corpApp.controller('ModuleController', function($scope, $http) {
	
	$scope.test = "test";
	 
});



corpApp.controller('mainCtrl', function($scope) {
    $scope.changeTheme = function() {
      var linkEls = document.querySelectorAll('link.theme');
      var sheetIndex = 0;
      angular.forEach(linkEls, function(stylesheet, i) {
        if (!stylesheet.disabled) {
          sheetIndex = i;
        }
      });
      linkEls[sheetIndex].disabled = true;
      linkEls[(sheetIndex + 1) % linkEls.length].disabled = false;
      sessionStorage['theme'] = linkEls[(sheetIndex + 1) % linkEls.length].href;
    };
});