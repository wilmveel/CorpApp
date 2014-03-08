var corpApp = angular.module('corpApp', ['ngRoute', 'corpApp.PeopleFinder', 'corpApp.departments', 'corpApp.presentation', 'corpApp.profile', 'corpApp.expenses', 'corpApp.coach', 'corpApp.carpool', 'corpApp.linkedin', 'corpApp.authorize', 'corpApp.test']);

/** Constantes */
corpApp.constant('config',{
	'API_URL' : 'https://corpapp.herokuapp.com',
	//'API_URL' : 'http://localhost:8080/corpapi'
});

/** Routing for the main app */
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
  
/** Cross side scripting. */
corpApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

corpApp.controller('HomeController', function($scope, $http, $location, $timeout, config) {
		
	$scope.color = function(i){
	
		color = {
			"0" : "color0",
			"1" : "color1",
			"2" : "color2",
			"3" : "color3",
		};
				
		return color[i % 4];
	};

  //Load linkedin profile
  $http.get(config.API_URL + '/rest/linkedin/me').
  success(function(data, status, headers, config) {
    $scope.user = data;
  });
		
  $scope.modules = [
    "PeopleFinder", 
    "expenses", 
    "coach", 
    "departments", 
    "presentation",
    "carpool", 
    "linkedin", 
    "authorize", 
    "test"
  ];

});

/** Main controller for look and feel */
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