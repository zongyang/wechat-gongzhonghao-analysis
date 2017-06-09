(function() {
	var wechatApp = angular.module('wechatApp');
	wechatApp.controller('wechatAppLoginCtrl', function($scope, $http, $state, modal, login) {

		$scope.submit = function(isValid) {
			if(!isValid)
				return

			$http.post('login', {
				username: $scope.username,
				password: $scope.password
			}).success(function(res) {
				modal.alertShow(res.msg);
				if(res.success) {
					login.setState($scope.username);
					//					window.location.href = '/#/admin/index'
					$state.go('admin');
				}

			})

		}
	})

})()