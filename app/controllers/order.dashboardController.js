(function (angular) {
	angular.module('order.dashboardController', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/dashboard', {
			templateUrl: 'app/views/dashboard.html',
			controller: 'order.dashboardController'
		})
	}]).controller('order.dashboardController', ['$scope','$document',function($scope,$document){
		var addChart = function ($document) {
			var oldScript = $document[0].querySelector('.chart');
			oldScript && oldScript.remove();
			var script = $document[0].createElement('script');
			script.src = 'app/controllers/chart.js';
			script.classList.add('chart');
			$document[0].body.appendChild(script);
		}
		addChart($document);
	}])
}(angular))