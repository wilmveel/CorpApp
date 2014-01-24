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

profileModule.controller('ProfileController', function($scope, $http) {
			$scope.status = {};
			//$scope.list = [];
			
			//$scope.list = $http.get("http://192.168.101.192:8080/searchcontact/Alejandro");
			
			$scope.list = [
			  {
				"_id": "52e2379d311d27494ac29707",
				"firstname": "Alex",
				"tussenvoegsel": "",
				"name": "Aalberts",
				"Sector": "T",
				"Practice": "T10",
				"Email": "ALEX.AALBERTS@CAPGEMINI.COM",
				"Grip": 90789,
				"mobile": "0654233881",
				"Client": "ING",
				"Residence": "Amsterdam",
				"Worklocation": "Amsterdam",
				"Available": "11-1-2014",
				"Expertise": [
				  "Cobol",
				  "Java",
				  "MongoDB",
				  "AngularJS"
				]
			  }
			  
			  

]

$scope.edit = function(){
		console.log("Edit profile: ", $scope.list[0]);
		var url = "http://192.168.101.192:8080/contacts/"+$scope.list[0]._id;
		console.log(url);
		return $http.post(url, $scope.list[0]).success(function(data){
				console.log(data);
				$scope.status = true;
			}).error(function(data){
				console.log(data);
				$scope.status = false;
				console.log($scope.status);
			});
	}
	
	
	
	

			
			
        });




	
	


