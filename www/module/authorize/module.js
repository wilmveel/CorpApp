var authorizeModule = angular.module('corpApp.authorize', ['ngRoute']);

//routing
authorizeModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/authorize', {
			templateUrl: 'module/authorize/login.html',
			controller: 'authorizeController'
		})
	}
]);

authorizeModule.service('authorizeService', function($log, $http, $q) {

	this.access_token = localStorage.getItem("access_token");
	
	this.hasToken = function(){
		if(this.access_token === null){
			return false;
		}else{
			return true;
		}
	}
	
	this.getToken = function(){
		return this.access_token;
	}
	
	this.removeToken = function(){
		localStorage.removeItem("access_token");
	}
	
	this.validateToken = function(){
		return $http.get('http://localhost:8080/sparklr2/rest/token', {
			params: {
				access_token: this.access_token
			}
		}).
		success(function(data, status, headers, config) {
			$log.debug("Connected to server open for connection");
			return "OK";
		}).
		error(function(data, status, headers, config) {
			if(status == 401){
				$log.debug("Unauthorized");
				localStorage.removeItem("access_token");
				return "UNAUTHORIZED";
				
			}else{
				$log.debug("Cannot reache server: ", status);
				return "NOTCONNECT";
			}
		});
	}
});

authorizeModule.controller('authorizeController', function($scope, $http, $log, $location, authorizeService) {
	
	var windowRef;
	
	var baseUrl = "http://localhost:8080/sparklr2";
	var clientId = "corpapp";
	var secret = "secret";
	
	$scope.token = authorizeService.getToken();
	
	// init
	$scope.session = 
	$http.get(baseUrl + '/rest/token', {
		params: {
			access_token: authorizeService.access_token
		}
	}).
	success(function(data, status, headers, config) {
		$scope.session = data;
	}).
	error(function(data, status, headers, config) {
		$log.error("cannot load session data");
	});
	
	$scope.authorized = function(){
		return authorizeService.hasToken();
	}
	
	$scope.setToken = function(){
		$log.debug("Set token: ", $scope.token);
		localStorage.setItem("access_token", $scope.token);
		$location.path("/home");
	}
	
	// Open popup to connect to capgemini
	$scope.authorize = function(){
		var url = baseUrl + "/oauth/authorize?response_type=token";
		url += "&client_id=" + clientId;
		windowRef = window.open(url, '_blank', 'location=no');
		windowRef.addEventListener('loadstop', loadstop);
	}
	
	// Listen on window and get information from url
	function loadstop(event) {
			
		var url = event.url;
        console.log(url);

        //once we've been redirected to this domain, fb's job is done
        if (/localhost/.test(url)){

            if (/code=/.test(url)){
                //auth done
                var code = url.match(/code=([^\&]+)/)
                if (code) code = code[1];
                $log.log("Request with code: " + code);
                windowRef.close();
            }else if (/access_token=/.test(url)){
                //login unsuccessful
                var access_token = url.match(/access_token=([^\&]+)/)
                if (access_token) access_token = access_token[1];
				$log.log("Set access_token" + access_token);
				localStorage.setItem("access_token", access_token);
                windowRef.close();
            }else if (/error_description=/.test(url)){
                //login unsuccessful
                var error = url.match(/error_description=([^\&]+)/);
                if (error) error = error[1].replace(/[^A-Z0-9 ]/gi, " ");
                $log.error("login failed: " + error);
                localStorage.removeItem("access_token");
                windowRef.close();
            }
		}
    }
	
});