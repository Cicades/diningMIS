(function (angular) {
	var myApp = angular.module('orderApp', [
		'ngRoute',
		'graphql',
		'order.dashboardController',
		'order.roomController',	
		'order.dishesController',
		'order.accountController',
		'order.orderController',
		'order.navAutofocus',
		'order.categoryController'
		]);
	myApp.config(['$routeProvider',function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/dashboard'});
	}]);
	myApp.controller('mainController', ['$scope', function($scope){
			$scope.test = true;
			$scope.logout = function () {
				localStorage.setItem('userToken', null)
			}
		}]);
}(angular))