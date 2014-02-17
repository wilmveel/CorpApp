var carpoolModule = angular.module('corpApp.carpool', ['ngRoute']);

//routing
carpoolModule.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/module/carpool', {
            templateUrl: 'module/carpool/list.html',
            controller: 'CarpoolController'
        });
    }
]);

carpoolModule.controller('CarpoolController', function($scope, $http) {
 
});