var contactModule = angular.module('corpApp.PeopleFinder', ['ngRoute']);

//routing
contactModule.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/module/PeopleFinder', {
                templateUrl: 'module/PeopleFinder/list.html',
                controller: 'PeopleFinderController'
            })
    }
]);

contactModule.controller('PeopleFinderController', function ($scope, $http) {

    $scope.search = function () {

        $http({method: 'GET', url: 'http://192.168.101.192:8080/contact/' + $scope.searchText}).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.list = data;
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.list = ["Error"];
            });

    };

    $scope.elasticSearch = function () {
        if ($scope.searchText.length > 3) {
            $scope.search();
        } else {
            $scope.list = {};
        }
    };

});