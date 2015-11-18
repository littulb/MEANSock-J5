(function () {
	var app = angular.module('APP', ["ngRoute"])
	
	// CONTROLLER
	app.controller('mainController', function ($scope, $http){
		var OBJECT = {
			message: [],
			Init: function (){},
			CacheDom: function () {},
			BindEvents: function () {}
		}
		OBJECT.Init();
	});

	app.config(function ($routeProvider) {
		$routeProvider
			.when("/", { templateUrl: "" })		
			.otherwise({redirectTo: "404.html"});
	});
})()