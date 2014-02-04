var expensesModule = angular.module('corpApp.linkedin', ['ngRoute']);

//routing
expensesModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/linkedin', {
			templateUrl: 'module/linkedin/partials/index.html',
			controller: 'IndexController'
		})
	}
]);

expensesModule.controller('IndexController', function($scope) {

	$scope.test = "Test";
	
	$scope.clientId = "7714w3q3mqlrro&state=DCEEFWF45453sdffef424";
	$scope.redirectUrl = "http://localhost/index.html#/module/linkedin";
	
});