(function() {
	var adminCtrls = angular.module('adminCtrls', []);
	adminCtrls.controller('adminRootCtrl', function($scope, $http, $state, modal, login) {
		$scope.sibarCls = {};
		$scope.$on('sideBarChange', function(event, key) {
			$scope.sibarCls = {};
			$scope.sibarCls[key] = 'active'
		});
		$scope.logout = function(e) {
			e.preventDefault();
			login.setState(null);
			$state.go('login')
		}
		$scope.preventDefault = function(e) {
			e.preventDefault()
		};
		$scope.user = {
			username: login.getState()
		}
	});
	adminCtrls.controller('indexCtrl', function($scope, $http, modal) {
		$scope.$emit('sideBarChange', 'index');
		$scope.startCrawler = function() {
			$http.get('crawler').success(function(res) {
				modal.alertShow(res.msg)
			})
		}
	});
	adminCtrls.controller('gongzhonghaoCtrl', function($scope, $http, modal, util, connectServer) {
		$scope.$emit('sideBarChange', 'gongzhonghao');
		$scope.editOp = true;
		$scope.delOp = true;
		$scope.modelKeys = ['tnickname', 'tnicknameUrl'];
		$scope.thNames = ['公众号', '公众号地址', '操作'];
		$scope.getData = connectServer.getData($scope, 'tnickname/');
		$scope.delData = function(data) {
			$http.delete('tnickname/' + data.tnickname).success(function(res) {
				if(res.success) {
					$scope.getData()
				}
				modal.alertShow(res.msg)
			})
		}
		$scope.editData = function() {
			$http.put('tnickname', $scope.selectedData).success(function(res) {
				modal.alertShow(res.msg);
				if(res.success) {
					util.updateGongzhonghao($scope.trDatas, $scope.selectedData)
				}
			})
		}
		$scope.addData = function() {
			$http.post('tnickname', $scope.selectedData).success(function(res) {
				modal.alertShow(res.msg);
				if(res.success) {
					$scope.getData()
				}
			})
		}
		$scope.getData()
	});
	adminCtrls.controller('articleCtrl', function($scope, $http, modal, util, connectServer) {
		$scope.delOp = true;
		$scope.$emit('sideBarChange', 'article');
		$scope.modelKeys = ['title', 'tnickname', 'tcontent', 'titleUrl', 'ttime'];
		$scope.thNames = ['标题', '公众号', '内容', '文章地址', '添加日期', '操作'];
		$scope.getData = connectServer.getData($scope, 'article/');
		$scope.delData = function(data) {
			$http.delete('article/' + data.tnickname + '/' + data.title).success(function(res) {
				if(res.success) {
					$scope.getData()
				}
				modal.alertShow(res.msg)
			})
		}
		$scope.getData()
	});
	adminCtrls.controller('topicCtrl', function($scope, $http, modal, util, connectServer) {
		$scope.delOp = true;
		$scope.$emit('sideBarChange', 'topic');
		$scope.modelKeys = ['title', 'titleSum', 'treadNum', 'treadAvgNum', 'tlikeNum', 'tlikeAvgNum'];
		$scope.thNames = ['话题', '文章总数', '阅读总数', '平均阅读书', '点赞总数', '平均点赞数','操作'];
		$scope.getData = connectServer.getData($scope, 'topic/');
		$scope.getData();

		//添加话题
		$scope.addData = function(isValid) {
			if(!isValid) {
				return;
			}
			$http.post('topic', {
				title: $scope.title
			}).success(function(res) {
				modal.alertShow(res.msg);
				if(res.success) {
					$scope.getData();
				}
			});

		};
		//删除话题
		$scope.delData = function(data) {
			$http.delete('topic/' + data.title).success(function(res) {
				if(res.success) {
					$scope.getData()
				}
				modal.alertShow(res.msg)
			})
		}
	});
	adminCtrls.controller('userCtrl', function($scope, $http, modal) {
		$scope.$emit('sideBarChange', 'user');
		$scope.username = $scope.user.username;
		$scope.submit = function(isValid) {
			if(!isValid) {
				return;
			}
			if($scope.newPassword != $scope.confirmPassword) {
				modal.alertShow('两次密码输入不一致');
				return;
			}
			$http.put('user', {
				username: $scope.username,
				password: $scope.password,
				newPassword: $scope.newPassword
			}).success(function(res) {
				modal.alertShow(res.msg);
				if(res.success) {
					$scope.user.username = $scope.username;
				}
			})
		}
	})
})()