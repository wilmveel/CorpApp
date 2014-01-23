var contactModule = angular.module('corpApp.contact', ['ngRoute']);

//routing
contactModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/contact', {
			templateUrl: 'module/contact/list.html',
			controller: 'ContactController'
		})
	}
]);

contactModule.controller('ContactController', function($scope, $http) {

	$scope.list = ["Willem Veeletnurf", "Christien Veelenturf"];
 
});