(function (angular) {
	angular.module('order.roomController', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/room', {
			templateUrl: 'app/views/room.html',
			controller: 'order.roomController'
		})
	}]).controller('order.roomController', ['$scope', '$http', function($scope, $http){
		$http.post('https://dev.maple007.top/admin/api/graphql',{'query': '{room {rooms{id name status floor}}}'}).
		then( res => { 
			$scope.roomList = res.data.data.room.rooms.slice(0, 7) 
			NProgress.done()
		} )
	}])
}(angular))