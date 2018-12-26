(function (angular) {
	angular.module('order.categoryController', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/category', {
			templateUrl: 'app/views/category.html',
			controller: 'order.categoryController'
		})
	}]).controller('order.categoryController', ['$scope', '$http', function($scope, $http){
		$http.post('https://dev.maple007.top/admin/api/graphql', {'query': '{food{categories{id name}}}'}).then( 
			res => {
				$scope.categories = res.data.data.food.categories
				NProgress.done()
			} )
	}])
}(angular))