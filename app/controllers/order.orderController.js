(function (angular) {
	angular.module('order.orderController', ['ngRoute', 'graphql'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/order', {
			templateUrl: 'app/views/order.html',
			controller: 'order.orderController'
		})
	}]).controller('order.orderController', ['$scope','$graphql', function($scope, $graphql){
		$scope.message = null//提示信息
		$scope.operationFlag = true
		$scope.orderFoodList = []
		//获取数据
		let getOrder = function () {
			$graphql.getData('{room {rooms{id name status floor}}}')
				.then( res => {
				$scope.roomList = res.data.data.room.rooms
				return $graphql.getData('{order{orders{roomId createAt finishAt foodList{count id name unitPrice}id totalPrice waiterId}}}')
			} ).then( res => {
				$scope.orders = res.data.data.order.orders
				$scope.orders.forEach(function (item ,index) {
					let foodContent = ''
					$scope.roomList.forEach(function (room, i) {
						if (item.roomId === room.id) {
							item.roomName = room.name
						}
					})
					let foods = []
					item.foodList.forEach(function (item, index) {
						foods.push(item.name)
					})
					item.foodContent = foods.toString()
				})
				NProgress.done()
			} )
		}
		getOrder()
		//搜索关键词
		$scope.keywords = ''
		//打开modal
		$scope.openModal = function () {
			$graphql.getData('{food{foods(limit:200,offset:0){id categoryId image name unitPrice}}}').then( res => {
				$scope.foods = res.data.data.food.foods //总菜品数
				$scope.foodList = res.data.data.food.foods.slice(0, 7) //modal展示的食物列表
				$('#orderForm').modal('handleUpdate')
			} )
		}
		//modal添加菜品
		$scope.addFood = function (food) {
			for(let i = 0 ;i < $scope.orderFoodList.length; i++){
				let now = $scope.orderFoodList[i]
				if (now.id == food.id) {
					now.count ++
					return
				}
			}
			food.count = 1
			$scope.orderFoodList.push(food)
		}
		//移除菜品
		$scope.removeFood = function (index) {
			if ( --$scope.orderFoodList[index].count == 0 ) {
				$scope.orderFoodList.splice(index, 1)
			}
			return false
		}
		//modal关闭
		$scope.closeModal = function () {
			$scope.orderFoodList = []
		}
		//modal搜索菜品
		$scope.modalSearch = function () {
			if ($scope.keywords.trim().length === 0) return $scope.foodList = $scope.foods.slice( 0, 7 )
			$scope.foodList = $scope.foods.filter(function (item, index) {
				return item.name.includes($scope.keywords)
			})
		}
		//创建订单
		$scope.createOrder = function () {
			let query = 'mutation createOrder($roomId:Int!,$foodList:[FoodListItemInputType]!){order{createOrder(roomId:$roomId,foodList:$foodList)}}'
			let operationName = 'createOrder'
			let data = {roomId: null, foodList: []}
			$scope.orderFoodList.forEach(function (item ,index) {
				data.foodList.push({
					id: item.id,
					count: item.count
				})
			})
			data.roomId = $scope.roomId
			$graphql.addDataQuery(query, data, operationName)
				.then( res => {
					//关闭模态框
					$('#orderForm').modal('hide')
					NProgress.start()
					if (res.data.data.order.createOrder) {
						$scope.operationFlag = true;
						$scope.message = '添加成功！'
						$scope.roomId = null
						$scope.orderFoodList = []
					} else {
						$scope.operationFlag = false;
						$scope.message = '添加失败！'
					}
					getOrder()
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '添加失败！'
			})
		}
		//删除订单
		$scope.deleteOrder = function (id) {
			let query = 'mutation deleteOrder($orderId:Int){order{deleteOrder(orderId:$orderId)}}'
			let data = { orderId:id }
			let operationName = 'deleteOrder'
			$graphql.addDataQuery(query, data, operationName)
				.then( res => {
					NProgress.start()
					if (res.data.data.order.deleteOrder) {
						$scope.operationFlag = true;
						$scope.message = '删除成功！'
						$scope.roomId = null
						$scope.orderFoodList = []
					} else {
						$scope.operationFlag = false;
						$scope.message = '删除失败！'
					}
					getOrder()
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '删除失败！'
			})
		}
	}])
}(angular))