
var coachModule = angular.module('corpApp.coach', ['ngRoute']);

//routing
coachModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/coach', {
			templateUrl: 'module/coach/list.html',
			controller: 'coachSearchController'
		}). when('/module/coach/Details/:contactId', {
                templateUrl: 'module/coach/details.html',
                controller: 'coachDetailsController'
            })
	}
]);

contactModule.controller('coachSearchController', function ($rootScope, $scope, $http, $location, $routeParams, CoachDetailservice) {

    $scope.list = CoachDetailservice.getList();
	$scope.Skill = CoachDetailservice.getSkill();
	$scope.status = {};

	
    $scope.searchGeneral = function (specificurl) {

        var promise = CoachDetailservice.searchGeneral($scope.Skill,specificurl);
        promise.then(function(value) {
            $scope.list = value;
        }, function(reason) {
            $scope.list = [];
			$scope.status = true;
        }, function(update) {
            $scope.list = [];
			$scope.status = true;
        });

    };

	$scope.searchCoach = function(){
		$scope.searchGeneral('http://192.168.101.192:8080/searchContact/');
	}
	
	$scope.searchStudent = function(){
		$scope.searchGeneral('http://192.168.101.192:8080/searchContact/');
	}

});

contactModule.controller('coachDetailsController', function ($rootScope, $scope, $http, $location, $routeParams, CoachDetailservice) {
    var init = function () {

        var promise = CoachDetailservice.getDetails($routeParams.contactId);
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

contactModule.service('CoachDetailservice', function ($http, $q) {

    var list = [];
	
	var skill = [];
	
	
	this.getSkill = function(){
        return skill;
    };
	
    this.getList = function(){
        return list;
    };

    this.searchGeneral = function(searchText, specificurl){
        var deferred = $q.defer();
		skill = searchText;
        setTimeout(function() {
            // since this fn executes async in a future turn of the event loop, we need to wrap
            // our code into an $apply call so that the model changes are properly observed.
            $http({method: 'GET', url: specificurl + searchText}).
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
