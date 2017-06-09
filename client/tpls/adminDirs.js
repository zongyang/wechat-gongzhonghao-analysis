(function() {
	var adminDirs = angular.module('adminDirs', []);
	adminDirs.directive('pSidebar', function() {
		// 写个filter控制显示字数
		return {
			restrict: 'AE',
			replace: true,
			scope: false,
			templateUrl: 'tpls/admin.sidebar.html',
			link: function(scope, element, attr) {

			}
		}
	})

	adminDirs.directive('pGongzhonghaoAddBtn', function(modal) {
		return {
			restrict: 'AE',
			replace: true,
			scope: false,
			templateUrl: 'tpls/admin.gongzhonghao.addBtn.html',
			link: function(scope, element, attr) {
				scope.addDataHandle = function() {
					scope.edit = false;

					scope.gongzhonghaoEditForm.$setPristine();
					scope.selectedData = {
						tnickname: null,
						tnicknameUrl: null
					};
					modal.gongzhonghaoEditModalShow();
				}
			}
		}
	})

	adminDirs.directive('pTopicAddBtn', function(modal) {
		return {
			restrict: 'AE',
			replace: true,
			scope: false,
			templateUrl: 'tpls/admin.topic.addBtn.html',
			link: function(scope, element, attr) {
				scope.addDataHandle = function() {
					scope.topicAddFrom.$setPristine();
					scope.title = null;
					modal.topicAddModalShow();
				}
			}
		}
	})
	adminDirs.directive('pTopicAddModdal', function(modal) {
		return {
			restrict: 'AE',
			replace: true,
			scope: false,
			templateUrl: 'tpls/admin.topic.add.html',
			link: function(scope, element, attr) {
				modal.topicAddModalShow = function() {
					element.modal('show');
				}
				modal.topicAddModalClose = function() {
					element.modal('hide');
				}

				element.find('.cancle,.close,.ok').bind('click', function(e) {
					element.modal('hide');
				})
			}
		}
	})
	
	
	adminDirs.directive('pGongzhonghaoEditModdal', function(modal) {
		return {
			restrict: 'AE',
			replace: true,
			scope: false,
			templateUrl: 'tpls/admin.gongzhonghao.edit.html',
			link: function(scope, element, attr) {
				modal.gongzhonghaoEditModalShow = function() {
					element.modal('show');
				}
				modal.gongzhonghaoEditModalClose = function() {
					element.modal('hide');
				}

				element.find('.cancle,.close,.ok').bind('click', function(e) {
					element.modal('hide');
				})

				scope.submit = function(isValid) {
					if(isValid && scope.edit) {
						scope.editData();
					} else if(isValid) {
						scope.addData();
					}
				}
			}
		}
	})

})()