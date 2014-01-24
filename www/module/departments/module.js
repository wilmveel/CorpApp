var contactModule = angular.module('corpApp.departments', ['ngRoute']);

//routing
contactModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/departments', {
			templateUrl: 'module/departments/list.html',
			controller: 'DepartmentsController'
		});
	}
]);

contactModule.controller('DepartmentsController', function($scope, $http) {

$http({method: 'GET', url: 'http://192.168.101.192:8080/departments/'}).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.list = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.list = ["Error"];
        });
 
});