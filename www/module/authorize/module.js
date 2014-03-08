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

authorizeModule.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      var token = localStorage.getItem("access_token");
      config.url =  config.url + '?access_token=' + token;
      return config;
    }
  };
});

authorizeModule.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});

/** Check wheter the token is vailid if not vailid remove from service and rout to login page */
authorizeModule.run(function($http, $log, $location, authorizeService) {

	if(authorizeService.hasToken()){
		authorizeService.validateToken().then(function(data){
			$log.debug("Token vailid: ", data);
			$location.path("/home");
		},function(data){
			$log.debug("Token invailid: ", data);
			authorizeService.removeToken();
			$location.path("/module/authorize");
		})
	}else{
		var url = $location.url();
		var access_token = url.match(/access_token=([^\&]+)/)
		// get token form url and set to service
        if (access_token){
			access_token = access_token[1];
			authorizeService.setToken(access_token);
			window.opener.location.reload(false);
			window.close();
		}else{
			$log.debug("No token found");
			$location.path("/module/authorize");
		}
	}
});

authorizeModule.service('authorizeService', function($log, $http, $q, config) {

	var corpKey = null;
	var userName = null;
	var accessToken = localStorage.getItem("access_token");
	
	this.hasToken = function(){
		if(accessToken === null){
			return false;
		}else{
			return true;
		}
	}
	
	this.getToken = function(){
		return accessToken;
	}
	
	this.setToken = function(access_token){
		accessToken = access_token;
		localStorage.setItem("access_token", accessToken);
	}
	
	this.removeToken = function(){
		localStorage.removeItem("access_token");
	}

	this.getUserName = function(){
		return userName;
	}

	this.getCorpKey = function(){
		return corpKey;
	}
	
	this.validateToken = function(){
		$log.debug("validateToken");
		return this.getUser().then(function(response) {
			corpKey = response.data.username.toUpperCase();
			userName = response.data.username;
			return response;
		},function(response) {
			$log.debug("Cannot validate!");
			if(response.status == 401){
				$log.debug("Unauthorized");
				localStorage.removeItem("access_token");
				return "UNAUTHORIZED";
				
			}else{
				$log.debug("Cannot reache server: ", status);
				return "NOTCONNECT";
			}
		});
	}
	
	this.getUser = function(){
		return $http.get(config.API_URL + '/rest/token').
		then(function(response) {
			$log.debug("getUser", response);
			return response;
		},function(response){
			$log.error("Not able to get token");
			return response;
		});
	}
});

authorizeModule.controller('authorizeController', function($scope, $http, $log, $location, authorizeService, config) {
	
	var windowRef;
	
	var clientId = "corpapp";
	var secret = "secret";
	var redirectUrl = "http://localhost/corpapp/#/module/authorize";
	
	
	$scope.accessToken = authorizeService.getToken();
	$scope.corpKey = authorizeService.getCorpKey();
	$scope.userName = authorizeService.getUserName();	
 
	
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
		var url = config.API_URL + "/oauth/authorize?response_type=token";
		url += "&client_id=" + clientId;
		url += "&redirect_uri=" + redirectUrl;
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