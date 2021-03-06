var expensesModule = angular.module('corpApp.expenses', ['ngRoute']);

//routing
expensesModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/expenses', {
			templateUrl: 'module/expenses/partials/camera.html',
			controller: 'ExpensesController'
		}).
		when('/module/expenses/form', {
			templateUrl: 'module/expenses/partials/form.html',
			controller: 'ExpensesController'
		}).
		when('/module/expenses/success', {
			templateUrl: 'module/expenses/partials/success.html',
			controller: 'ExpensesController'
		})
	}
]);

expensesModule.controller('ExpensesController', function($scope) {

	$scope.camera = function(){		
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });
	}

	$scope.gallery = function(){		
		navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.FILE_URI, sourceType: pictureSource.PHOTOLIBRARY });
	}

	$scope.save = function(){		
		$scope.status = true;
		window.location.href = "index.html#/module/expenses/success";
	}
	
});

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
	// Uncomment to view the base64-encoded image data
	// console.log(imageData);

	window.location.href = "index.html#/module/expenses/form";
	
	// Get image handle
	//
	//var smallImage = document.getElementById('smallImage');

	// Unhide image elements
	//
	//smallImage.style.display = 'block';

	// Show the captured photo
	// The in-line CSS rules are used to resize the image
	//
	//smallImage.src = "data:image/jpeg;base64," + imageData;

	//
		
	//window.location.href = "index.html#/module/expenses/form";
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI
	// console.log(imageURI);

	// Get image handle
	//
	var largeImage = document.getElementById('largeImage');

	// Unhide image elements
	//
	largeImage.style.display = 'block';

	// Show the captured photo
	// The in-line CSS rules are used to resize the image
	//
	largeImage.src = imageURI;
	
	window.location.href = "index.html#/module/expenses/form";
}

function test(imageURI) {
	window.location = "#/module/expenses/form";
}
// A button will call this function
//
function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true, destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.FILE_URI, sourceType: source });
}

// Called if something bad happens.
//
function onFail(message) {
	alert('Failed because: ' + message);
}