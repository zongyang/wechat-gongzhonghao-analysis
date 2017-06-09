(function() {
	var frontDirs = angular.module('frontDirs', []);
	frontDirs.directive('pRead', function() {
		return {
			restrict: 'AE',
			scope: false,
			templateUrl: 'tpls/front.read.html',
			link: function(scope, element, attr) {

			}
		}
	})

	frontDirs.directive('pHot', function() {
		return {
			restrict: 'AE',
			scope: false,
			templateUrl: 'tpls/front.hot.html',
			link: function(scope, element, attr) {

			}
		}
	})

	frontDirs.directive('pShoucang', function() {
		return {
			restrict: 'AE',
			scope: false,
			templateUrl: 'tpls/front.shoucang.html',
			link: function(scope, element, attr) {}
		}
	})
	frontDirs.directive('pLike', function() {
		return {
			restrict: 'AE',
			scope: false,
			templateUrl: 'tpls/front.like.html',
			link: function(scope, element, attr) {}
		}
	})

	frontDirs.directive('pNeirong', function() {
		return {
			restrict: 'AE',
			scope: false,
			templateUrl: 'tpls/front.neirong.html',
			link: function(scope, element, attr) {}
		}
	})
})()