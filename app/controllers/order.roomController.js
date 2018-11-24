(function (angular) {
	angular.module('order.roomController', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/room', {
			templateUrl: 'app/views/room.html',
			controller: 'order.roomController'
		})
	}]).controller('order.roomController', ['$scope', function($scope){
	}])
}(angular))