(function (angular) {
	angular.module('order.dishesController', ['ngRoute', 'graphql'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/dishes/page/:page', {
			templateUrl: 'app/views/dishes.html',
			controller: 'order.dishesController'
		})
	}]).controller('order.dishesController', ['$scope', '$http', '$graphql', '$routeParams', '$route', function($scope, $http, $graphql, $routeParams, $route){
		$scope.message = null//提示信息
		$scope.operationFlag = true
		$scope.foodId = null
		$scope.currentPage = $routeParams.page
		$scope.totalPages = 10 //分页初始页面数
		//初始化分页
		let paginationInit = function () {
			// $('.pagination').remove()
			// $('#paginationBox').append('<ul class="pagination justify-content-end col-sm-9"></ul>')
			$('.pagination').twbsPagination({
			    currentPage: $scope.currentPage == 0 ? 1:$scope.currentPage,
			    totalPages:  $scope.totalPages,
			    first: "首页",
			    last: "未页",
			    prev: '上一页',
			    next: '下一页',
			    startPage: $scope.currentPage <= $scope.totalPages ? $scope.currentPage:$scope.totalPages - 1,
			    // startPage: $scope.currentPage,
			    initiateStartPageClick: false,
			    // visiblePages:totalPages>10?10:totalPages,//解决当totalPages小于visiblePages页码变负值的bug
			    onPageClick: function (event, page) {
			    	NProgress.start()
			    	$scope.currentPage = page
			    	getData($scope.currentPage)
			    	$scope.viewCategory = null
			    }
			})
		}
		let getData = function (page) {
			let pageSize = 10
			let offset = 10*(page-1)
			$graphql.getData(`{food{foods(limit:200,offset:0){id}}}`).then( res => {
				let length = res.data.data.food.foods.length
				$scope.totalPages = Math.ceil( length / pageSize)
				$graphql.getData(`{food{foods(limit:${pageSize},offset:${offset}){id categoryId image name unitPrice}}}`).then( res => {
					$scope.foods = res.data.data.food.foods
					$scope.foodList = res.data.data.food.foods
					paginationInit()
					return $graphql.getData('{food{categories{id name}}}')
				} ).then( res => {
					$scope.categories = res.data.data.food.categories
					NProgress.done()
				} )
			} )
		}
		getData($scope.currentPage)
		// 食物分类
		$scope.changeCate = () => {
			$scope.foodList = $scope.foods.filter( function (item, index) {
				return item.categoryId == $scope.viewCategory
			} )
		}
		//删除食物
		$scope.delFood = function (id) {
			$graphql.delData('Food', id).then( res => {
					NProgress.start()
					if (res.data.data.food.deleteFood) {
						$scope.operationFlag = true;
						$scope.message = '删除成功！'
					} else {
						$scope.operationFlag = false;
						$scope.message = '删除失败！'
					}
					getData($scope.currentPage)
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '删除失败！'
			})	
		}
		//修改食物
		$scope.updateFood = food => {
			$scope.image = food.image
			$scope.name = food.name
			$scope.price = food.unitPrice
			$scope.categoryId = food.categoryId
			$scope.foodId = food.id
		}
		//添加或修改食物
		$scope.addFood = function () {
			let food = {
				food: {
					name: $scope.name,
					unitPrice: $scope.price,
					image: $scope.foodId == null ? '暂无':$scope.image,
					categoryId: parseInt($scope.categoryId)
				}
			}
			if (!$scope.foodId) {
					$graphql.addData('Food', food).then( res => {
					NProgress.start()
					if (res.data.data.food.createFood) {
						$scope.operationFlag = true;
						$scope.message = '添加成功！'
						$scope.name = ''
						$scope.price = ''
						$scope.categoryId = 0
						$scope.image = null
						$scope.foodId = null
					} else {
						$scope.operationFlag = false;
						$scope.message = '添加失败！'
					}
					getData($scope.currentPage)
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '添加失败！'
				})
			} else {
					$graphql.updateData('Food', $scope.foodId, food).then( res => {
					NProgress.start()
					console.log(res)
					if (res.data.data.food.updateFood) {
						$scope.operationFlag = true;
						$scope.message = '修改成功！'
						$scope.name = ''
						$scope.price = ''
						$scope.categoryId = 0
						$scope.image = null
						$scope.foodId = null
					} else {
						$scope.operationFlag = false;
						$scope.message = '修改失败！'
					}
					getData($scope.currentPage)
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '修改失败！'
				})
			}
		}
	}])
}(angular))