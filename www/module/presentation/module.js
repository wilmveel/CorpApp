var contactModule = angular.module('corpApp.presentation', ['ngRoute']);

//routing
contactModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/presentation', {
			templateUrl: 'module/presentation/list.html',
			controller: 'PresentationController'
		});
	}
]);

contactModule.controller('PresentationController', function($scope, $http) {
 
});