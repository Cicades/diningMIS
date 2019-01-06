(function (angular) {
	angular.module('order.accountController', ['ngRoute', 'graphql'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/account', {
			templateUrl: 'app/views/account.html',
			controller: 'order.accountController'
		})
	}]).controller('order.accountController', ['$scope','$graphql', function($scope, $graphql){
		$scope.message = null;//提示信息
		$scope.operationFlag = true;
		$scope.userId = null
		let getUserList = function () {
			let query = '{user{getUserList{id type username}}}'
			$graphql.getData(query)
				.then( res => {
					NProgress.done()
					$scope.users = res.data.data.user.getUserList
				} )
		}
		getUserList()
		//修改密码
		$scope.changePassword = function (user) {
			$scope.userId = user.id
			$scope.username = user.username
			$scope.password = ''
			$scope.userType = user.type
		}
		//保存信息
		$scope.addWaiter = function () {
			let user = {
				user: {
					username: $scope.username,
					password: $scope.password
				}
			}
			if (!$scope.userId) {
					$graphql.addDataQuery('mutation addWaiter($user:UserInputType!){user{newWaiter(user:$user)}}', user, 'addWaiter').then( res => {
					NProgress.start()
					console.log(res)
					if (res.data.data.user.newWaiter) {
						$scope.operationFlag = true;
						$scope.message = '添加成功！'
						$scope.username = ''
						$scope.password = ''
						$scope.userType = ''
					} else {
						$scope.operationFlag = false;
						$scope.message = '添加失败！'
					}
					getUserList()
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '添加失败！'
				})
			} else {
					$graphql.addDataQuery('mutation changePassword($user:UserInputType!){user{changeUserPassword(user:$user)}}', user, 'changePassword').then( res => {
					NProgress.start()
					console.log(res)
					if (res.data.data.user.changeUserPassword) {
						$scope.operationFlag = true;
						$scope.message = '修改成功！'
						$scope.username = ''
						$scope.password = ''
						$scope.userType = ''
					} else {
						$scope.operationFlag = false;
						$scope.message = '修改失败！'
					}
					getUserList()
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '修改失败！'
				})
			}
		}
		//删除用户
		$scope.deleteUser = function (id) {
			$graphql.getData(`mutation deleteUser{user{deleteUser(deleteId:${id})}}`).then( res => {
					NProgress.start()
					if (res.data.data.user.deleteUser) {
						$scope.operationFlag = true;
						$scope.message = '删除成功！'
					} else {
						$scope.operationFlag = false;
						$scope.message = '删除失败！'
					}
					getUserList()
				}, () => {
					$scope.operationFlag = false;
					$scope.message = '删除失败！'
			})	
		}
	}])
}(angular))