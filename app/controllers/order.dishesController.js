(function (angular) {
	angular.module('order.dishesController', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/dishes', {
			templateUrl: 'app/views/dishes.html',
			controller: 'order.dishesController'
		})
	}]).controller('order.dishesController', ['$scope', '$http', function($scope, $http){
		$http.post('https://dev.maple007.top/admin/api/graphql', {'query': '{food{foods{id name image unitPrice categoryId}}}'}).then( 
			res => {
				$scope.foodList = res.data.data.food.foods
				NProgress.done()
			} )
	}])
}(angular))