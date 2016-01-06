(function () {
	var app = angular.module('APP', ["ngRoute"])
	
	// CONTROLLER
	app.controller('mainController', function ($scope, $http){
		var OBJECT = {
			message: [],
			Init: function (){
				this.GetJFive();
			},
			CacheDom: function () {},
			GetJFive: function () {
				socket.on('johnny', function (data) {
					console.dir(data);
					alert(data);
				});
			},
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