(function (angular) {
	angular.module('order.orderController', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/order', {
			templateUrl: 'app/views/order.html',
			controller: 'order.orderController'
		})
	}]).controller('order.orderController', ['$scope', function($scope){
	}])
}(angular))