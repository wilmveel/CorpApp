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

    $scope.list = [];

    $scope.search = function () {

		PeopleDetailservice.search($scope.searchText).then(
		function(value) {
			$scope.list = value.data;
		}, 
		function(reason) {
			$scope.list = [];
		}, 
		function(update) {
			$scope.list = [];
		});
    };

    $scope.elasticSearch = function () {
        if ($scope.searchText.length > 3) {
            $scope.search();
        } else {
            $scope.list = [];
        }
    };

});

contactModule.controller('PeopleDetailController', function ($rootScope, $scope, $http, $location, $routeParams, PeopleDetailservice) {
    var init = function () {

        var promise = PeopleDetailservice.getDetails($routeParams.contactId);
        promise.then(function(value) {
            $scope.detail = value.data;
			console.log(value);
        }, function(reason) {
            $scope.detail = {};
        }, function(update) {
            $scope.detail = {};
        });

    };

    init();
});

contactModule.service('PeopleDetailservice', function ($http, $q, config) {

    var list = [];

    this.getList = function(){
        return list;
    };

    this.search = function(searchText){
        		
		return $http.get(config.API_URL + '/servicePeople?search=' + searchText).
		success(function(data, status, headers, config) {
			list = data;
			return list;
		}).error(function(data, status, headers, config) {
			alert("cannot connect to server");
			return [];
		});

    };

    this.getDetails = function(contactId){
        var deferred = $q.defer();
		
		var item = {};
		
		return $http.get(config.API_URL + '/servicePeople?corpkey=' + contactId).
		success(function(data, status, headers, config) {
			item = data;
			return item;
		}).error(function(data, status, headers, config) {
			alert("cannot connect to server");
			return null;
		});
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