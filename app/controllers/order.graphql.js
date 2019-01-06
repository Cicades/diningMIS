(function (angular) {
	angular.module('graphql', [])
		.service('$graphql', ['$http',function ($http) {
		let token = localStorage.getItem('userToken')
		//获取数据
		this.getData = function (query) {
			return $http( {
			method: 'POST',
			url: 'https://dev.maple007.top/admin/api/graphql',
			headers: {
				'Authorization': 'Bearer ' + token
			},
			data: {
				'query': query
			}
		} )
		}
		//删除数据
		this.delData = function (item, id) {
			let itemLower = item.toLowerCase()
			let query = `
				mutation ${'del'+item}{
				  ${itemLower}{
				    ${'delete'+item}(${itemLower+'Id'}:${id})
				  }
				}
			`
			return $http( {
			method: 'POST',
			url: 'https://dev.maple007.top/admin/api/graphql',
			headers: {
				'Authorization': 'Bearer ' + token
			},
			data: {
				'query': query
			}
		} )
		}
		//添加数据
		this.addData = function (item, data) {
			let itemLower = item.toLowerCase()
			let query = `mutation ${'add'+item}(${'$'+itemLower}:${item+'InputType!'}){${itemLower}{${'create'+item}(${itemLower}:${'$'+itemLower})}}`
			let variables = JSON.stringify(data)
			let operationName = `${'add'+item}`
			return $http( {
			method: 'POST',
			url: `https://dev.maple007.top/admin/api/graphql?query=${query}&variables=${variables}&operationName=${operationName}`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + token
			}
			} )
		}
		this.addDataQuery = function (query, data, operationName) {
			let variables = JSON.stringify(data)
			return $http( {
			method: 'POST',
			url: `https://dev.maple007.top/admin/api/graphql?query=${query}&variables=${variables}&operationName=${operationName}`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + token
			}
			} )
		}
		//修改数据
		this.updateData =  function (item, id, data) {
			let itemLower = item.toLowerCase()
			data[itemLower+'Id'] = id
			let query = `mutation ${'update'+item}(${'$'+itemLower}:${item+'InputType!'},${'$'+itemLower+'Id'}:Int!){${itemLower}{${'update'+item}(${itemLower}:${'$'+itemLower},${itemLower+'Id'}:${'$'+itemLower+'Id'})}}`
			let variables = JSON.stringify(data)
			let operationName = `${'update'+item}`
			return $http( {
			method: 'POST',
			url: `https://dev.maple007.top/admin/api/graphql?query=${query}&variables=${variables}&operationName=${operationName}`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + token
			}
			} )
		}
	}])
})(angular)