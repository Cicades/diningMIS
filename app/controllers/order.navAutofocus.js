(function (angular) {
	angular.module('order.navAutofocus', []).
	directive('autofocus', ['$location', function($location){
		// Runs during compile
		return {
			restrict: 'A', 
			link: function($scope, iElm, iAttrs, controller) {
				let path = $location.path();
				let aLink = iElm.children();
				let href = aLink.attr('href');
				href.endsWith(path) ? aLink.addClass('active') : aLink.removeClass('active');
				iElm.on('click',function () {
					iElm.parent().children().children().removeClass('active');
					aLink.addClass('active');
				})
			}
		};
	}]);
}(angular))