(function (angular) {
	angular.module('order.dishesController', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/dishes', {
			templateUrl: 'app/views/dishes.html',
			controller: 'order.dishesController'
		})
	}]).controller('order.dishesController', ['$scope', function($scope){
		console.log('jjja')
	}])
}(angular))