var contactModule = angular.module('corpApp.PeopleFinder', ['ngRoute']);

//routing
contactModule.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/module/PeopleFinder', {
            templateUrl: 'module/PeopleFinder/list.html',
            controller: 'PeopleFinderController'
        }). when('/module/PeopleFinder/Details/:contactId', {
                templateUrl: 'module/PeopleFinder/details.html',
                controller: 'PeopleDetailController'
            })
    }
]);

contactModule.controller('PeopleFinderController', function ($rootScope, $scope, $http, $location, $routeParams, PeopleDetailservice) {

    $scope.list = PeopleDetailservice.getList();

    $scope.search = function () {

        var promise = PeopleDetailservice.search($scope.searchText);
        promise.then(function(value) {
            $scope.list = value;
        }, function(reason) {
            $scope.list = [];
        }, function(update) {
            $scope.list = [];
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

contactModule.controller('PeopleDetailController', function ($rootScope, $scope, $http, $location, $routeParams, PeopleDetailservice) {
    var init = function () {

        var promise = PeopleDetailservice.getDetails($routeParams.contactId);
        promise.then(function(value) {
            $scope.detail = value;
        }, function(reason) {
            $scope.detail = {};
        }, function(update) {
            $scope.detail = {};
        });

    };

    init();
});

contactModule.service('PeopleDetailservice', function ($http, $q) {

    var list = [];

    this.getList = function(){
        return list;
    };

    this.search = function(searchText){
        var deferred = $q.defer();

        setTimeout(function() {
            // since this fn executes async in a future turn of the event loop, we need to wrap
            // our code into an $apply call so that the model changes are properly observed.
            $http({method: 'GET', url: 'http://192.168.101.192:8080/searchContact/' + searchText}).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    list = data;
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    list = [];
                    deferred.resolve(list);
                });
        }, 5);

        return deferred.promise;
    };

    this.getDetails = function(contactId){
        var deferred = $q.defer();

        setTimeout(function() {
            // since this fn executes async in a future turn of the event loop, we need to wrap
            // our code into an $apply call so that the model changes are properly observed.
            $http({method: 'GET', url: 'http://192.168.101.192:8080/contact/' + contactId}).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    deferred.resolve({});
                });
        }, 5);

        return deferred.promise;
    };
 });

contactModule.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }
        length = value.length;
        return (value.slice(0,length-8) + " " + value.slice(length-8,length-4) + " " + value.slice(length-4 ,length));
    };
});