(function (angular) {
	angular.module('order.roomController', ['ngRoute', 'graphql'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/room/operation/:operationName/floor/:floor', {
			templateUrl: 'app/views/room.html',
			controller: 'order.roomController'
		})
	}]).controller('order.roomController', ['$scope', '$http', '$routeParams', '$graphql', function($scope, $http, $routeParams, $graphql){
		$scope.roomId = null
		$scope.message = null;//提示信息
		$scope.operationFlag = true;
		$scope.floor = $routeParams.floor
		$scope.floors = []
		//封装获取数据函数
		let getData = function () {
			$graphql.getData('{room {rooms{id name status floor}}}').then( res => {
			$scope.rooms = res.data.data.room.rooms
			$scope.rooms.forEach( function (item, index) {
				if (!$scope.floors.includes(item.floor)) {
					$scope.floors.push(item.floor)
				}
			} )
			$scope.roomList = $scope.rooms.filter(( item, index ) => {
				return item.floor == $routeParams.floor
			})
			NProgress.done()
		 } )
		}
		//获取房间列表
		getData()
		//删除房间
		$scope.delRoom = id => {
			NProgress.start()
			$graphql.delData('Room', id)
				.then( res => {
					NProgress.done()
					console.log(res)
					if (res.data.data.room.deleteRoom) {
						$scope.operationFlag = true;
						$scope.message = '删除成功！'
					} else {
						$scope.operationFlag = false;
						$scope.message = '删除失败！'
					}
					getData()
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '删除失败！'
				})			
			return false
		}
		//修改房间
		$scope.updateRoom = room => {
			$scope.roomNum = room.name
			$scope.roomFloor = room.floor
			$scope.roomStatus = room.status
			$scope.roomId = room.id
		}
		//更新房间数据
		$scope.saveRoom = () => {
			if ($scope.roomId) {
			let query = 'mutation updateRoom($roomId:Int!,$room:RoomInputType!){room{updateRoom(roomId:$roomId,room:$room)}}'
			let operationName = 'updateRoom'
			let data = {
				roomId: $scope.roomId, 
				room: {
					floor: $scope.roomFloor,
					name: $scope.roomNum
				}}
			$graphql.addDataQuery(query, data, operationName)
				.then( res => {
					NProgress.start()
					if (res.data.data.room.updateRoom) {
						$scope.operationFlag = true;
						$scope.message = '修改成功！'
						$scope.roomId = null
						$scope.orderFoodList = []
					} else {
						$scope.operationFlag = false;
						$scope.message = '修改失败！'
					}
					getData()
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '修改失败！'
			})
		} else{
			//新增房间数据
			let query = 'mutation createRoom($room:RoomInputType!){room{createRoom(room:$room)}}'
			let operationName = 'createRoom'
			let data = { 
				room: {
					floor: $scope.roomFloor,
					name: $scope.roomNum
				}}
			$graphql.addDataQuery(query, data, operationName)
				.then( res => {
					NProgress.start()
					if (res.data.data.room.createRoom) {
						$scope.operationFlag = true;
						$scope.message = '添加成功！'
						$scope.roomId = null
						$scope.orderFoodList = []
					} else {
						$scope.operationFlag = false;
						$scope.message = '添加失败！'
					}
					getData()
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '添加失败！'
			})
		}
		} 
	}])
}(angular))