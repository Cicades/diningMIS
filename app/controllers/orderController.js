(function (angular) {
	var myApp = angular.module('orderApp', [
		'ngRoute',
		'order.dashboardController',
		'order.roomController',	
		'order.dishesController',
		'order.accountController',
		'order.orderController',
		'order.navAutofocus'
		]);
	myApp.config(['$routeProvider',function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/dashboard'});
	}]);
	myApp.controller('mainController', ['$scope', function($scope){
			$scope.test = true;
		}]);
}(angular))