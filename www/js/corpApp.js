var corpApp = angular.module('corpApp', ['ngRoute', 'corpApp.PeopleFinder', 'corpApp.departments', 'corpApp.presentation', 'corpApp.profile', 'corpApp.expenses', 'corpApp.coach', 'corpApp.carpool'`, 'corpApp.linkedin']);

corpApp.constant('config',{
	'API_URL' : 'http://turfje.nl/corpapp',
	//'API_URL' : 'http://localhost/corpservice'
});

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
  
corpApp.controller('LoginController', function($scope, $http, $location, Loginservice, config) {
	
	$scope.username = "WVEELENT";
	$scope.error = false;
	
	$scope.login = function(){
		
		
		var data = {
			"username" : $scope.username,
			"password"	: "1234"
		}
		$http.post(config.API_URL + '/auth/', data).
		success(function(data, status, headers, config) {
			Loginservice.username = $scope.username;
			$location.path("/home");
		}).
		error(function(data, status, headers, config) {
			$scope.list = {};
			$scope.error = true;
		});
	};
	
});

corpApp.service('Loginservice', function () {

    var username;

});

corpApp.controller('HomeController', function($scope, $http, $location, Loginservice, config) {
		
	$scope.color = function(i){
	
		color = {
			"0" : "color0",
			"1" : "color1",
			"2" : "color2",
			"3" : "color3",
		};
				
		return color[i % 4];
	};

	$scope.modules = ["PeopleFinder", "expenses", "coach", "departments", "presentation","carpool", "linkedin"];
	
	$http.get(config.API_URL + '/servicePeople?corpkey=' + Loginservice.username).
	success(function(data, status, headers, config) {
	
		Loginservice.username = data.corpkey
		$scope.item = data;
	}).
	error(function(data, status, headers, config) {
		$location.path("/");
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