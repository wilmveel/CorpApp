var profileModule = angular.module('corpApp.profile', ['ngRoute']);

//routing
profileModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/profile', {
			templateUrl: 'module/profile/list.html',
			controller: 'ProfileController'
		})
	}
]);

profileModule.controller('ProfileController', function($scope, $http, Loginservice) {
			$scope.status = {};
			$scope.available = "";
			$scope.notavailable = "";

            $scope.item = {};
			
			//$scope.list = $http.get("http://192.168.101.192:8080/searchcontact/Alejandro");
				
			$http({method: 'GET', url: 'http://192.168.101.192:8080/searchcontact/' + Loginservice.username}).
	        success(function(data, status, headers, config) {
	            // this callback will be called asynchronously
	            // when the response is available
	            $scope.item = data[0];
	    
	        }).
	        error(function(data, status, headers, config) {
	            // called asynchronously if an error occurs
	            // or server returns response with an error status.
	            $scope.list = {};
                    alert("Error");
	        });

    $scope.edit = function(){
		console.log("Edit profile: ", $scope.item);
		//var url = "http://192.168.101.192:8080/contact";
		//console.log(url);

        console.log("Form data", $scope.item);

		$http({method: 'POST', url: 'http://192.168.101.192:8080/contact', data: $scope.item}).
		success(function(data, status){
            console.log(data);
            $scope.status = true;
        }).error(function(data,status,headers,config){
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
            $scope.status = false;
        });
	};
			
});




	
	


