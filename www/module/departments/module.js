var contactModule = angular.module('corpApp.departments', ['ngRoute']);

//routing
contactModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/departments', {
			templateUrl: 'module/departments/list.html',
			controller: 'DepartmentsController'
		})
	}
]);

contactModule.controller('DepartmentsController', function($scope, $http) {

	$scope.list = ["Erik Mons", "Chris Aukema"];
 
});