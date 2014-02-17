var capgeminissoModule = angular.module('corpApp.linkedin', ['ngRoute']);

//routing
capgeminissoModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/capgeminisso', {
			templateUrl: 'module/linkedin/login.html',
			controller: 'IndexController'
		})
	}
]);

capgeminissoModule.controller('IndexController', function($scope, $http) {
	
	var url = "https://sso.capgemini.com/authent/authent_action.asp";
	
	var params = {
		"hidSelectedSSOServiceName" : "undefined",
		"server_identifier" : "undefined",
		"calling_url" : "https://sso.capgemini.com/home.asp",
		"cookie_err" : "NOT_ON_CGNET",
		"filter_version" : "",
		"hidSelectedSSOServiceName" : "undefined",
	}
	
	$scope.login = function(){
		iabRef = window.open($scope.url, '_blank', 'location=no');
        iabRef.addEventListener('loadstart', iabLoadStart);
        iabRef.addEventListener('loadstop', iabLoadStop);
        iabRef.addEventListener('loaderror', iabLoadError);
        iabRef.addEventListener('exit', iabClose);
	}
	
	function iabLoadStart(event) {
        alert(event.type + ' - ' + event.url);
		if(event.url.startsWith("http://google")){
			alert("Close");
			iabRef.close();
		}
    }

    function iabLoadStop(event) {
        alert(event.type + ' - ' + event.url);
    }

	function iabLoadError(event) {
		alert(event.type + ' - ' + event.message);
	}
		
	function iabClose(event) {
        alert(event.type + ' - ' + event.message);
    }

	
});