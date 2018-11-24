(function (angular) {
	angular.module('order.accountController', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/account', {
			templateUrl: 'app/views/account.html',
			controller: 'order.accountController'
		})
	}]).controller('order.accountController', ['$scope', function($scope){
		console.log('jjja')
	}])
}(angular))