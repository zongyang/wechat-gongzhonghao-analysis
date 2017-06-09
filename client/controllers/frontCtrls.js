(function() {
	var frontCtrls = angular.module('frontCtrls', []);
	frontCtrls.controller('frontRootCtrl', function($scope) {});
	frontCtrls.controller('readRankCtrl', function($scope, $http) {
		$http.get('read-rank/1/5').success(function(res) {
			$scope.readRankData = res.msg.data
		})
	});
	frontCtrls.controller('hotRankCtrl', function($scope, $http) {
		$http.get('hot-rank/1/5').success(function(res) {
			$scope.hotRankData = res.msg.data
		})
	});
	frontCtrls.controller('likeRankCtrl', function($scope, $http) {
		$http.get('like-rank/1/5').success(function(res) {
			$scope.likeRankData = res.msg.data
		})
	});
	frontCtrls.controller('neirongRankCtrl', function($scope, $http) {
		$http.get('neirong-rank/1/5').success(function(res) {
			$scope.neirongRankData = res.msg.data
		})
	});
	frontCtrls.controller('shoucangRankCtrl', function($scope, $http) {
		$http.get('shoucang-rank/1/5').success(function(res) {
			$scope.shoucangRankData = res.msg.data
		})
	});
	frontCtrls.controller('readCtrl', function($scope, $http, connectServer) {
		$scope.modelKeys = ['tnickname', 'title', 'tcontent', 'titleUrl', 'treadNum', 'ttime'];
		$scope.thNames = ['公众号', '文章标题', '文章内容', '文章地址', '阅读数', '时间'];
		$scope.getData = connectServer.getData($scope, 'read-rank/');
		$scope.getData()
	});
	frontCtrls.controller('hotCtrl', function($scope, $http, connectServer) {
		$scope.modelKeys = ['hotTitle', 'hotUrl'];
		$scope.thNames = ['热搜词', '热搜词地址'];
		$scope.getData = connectServer.getData($scope, 'hot-rank/');
		$scope.getData()
	});
	frontCtrls.controller('likeCtrl', function($scope, $http, connectServer) {
		$scope.modelKeys = ['tnickname', 'title', 'tcontent', 'titleUrl', 'tlikeNum', 'ttime'];
		$scope.thNames = ['公众号', '文章标题', '文章内容', '文章地址', '点赞数', '时间'];
		$scope.getData = connectServer.getData($scope, 'like-rank/');
		$scope.getData()
	});
	frontCtrls.controller('neirongCtrl', function($scope, $http, connectServer) {
		$scope.modelKeys = ['nrUserName', 'nrUserUrl', 'nrTit', 'nrTitUrl', 'nrTime'];
		$scope.thNames = ['公众号', '公众号地址', '文章标题', '文章地址', '时间'];
		$scope.getData = connectServer.getData($scope, 'neirong-rank/');
		$scope.getData()
	});
	frontCtrls.controller('shoucangCtrl', function($scope, $http, connectServer) {
		$scope.modelKeys = ['scUserName', 'scUserUrl', 'scTit', 'scTitUrl', 'scTime'];
		$scope.thNames = ['公众号', '公众号地址', '文章标题', '文章地址', '时间'];
		$scope.getData = connectServer.getData($scope, 'shoucang-rank/');
		$scope.getData()
	})
})()