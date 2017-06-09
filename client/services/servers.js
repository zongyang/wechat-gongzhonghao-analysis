(function() {
	var services = angular.module('services', []);
	services.service('login', function() {
		this.getState = function() {
			return sessionStorage.getItem('user');
		}
		this.setState = function(value) {
			sessionStorage.setItem('user', value);
		}
	})

	// dataStruct:{keys:[]}
	services.service('connectServer', function($http, pageConfig, modal) {
		var _this = this;

		this.getData = function($scope, url, dataStruct, cb) {
			pageConfig.init();
			$scope.pageConfig = pageConfig;
			return function() {
				$http.get(url + $scope.pageConfig.curentPage + '/' + $scope.pageConfig.limit).success(function(res) {
					if (res.success) {
						$scope.trDatas = _this.setDataStruct($scope.modelKeys, res.msg.data);
						$scope.pageConfig.pages = res.msg.pages;
						$scope.pageConfig.total = res.msg.total;

						if (cb)
							cb(res.msg);
					} else {
						modal.alertShow(res.msg)
					}
				})
			}
		}

		this.setDataStruct = function(keys, data) {
			var obj = {};
			var arr = [];
			var i, j;
			for (i = 0; i < data.length; i++) {
				obj = {};
				for (j = 0; j < keys.length; j++) {
					obj[keys[j]] = data[i][keys[j]];
				}
				arr.push(obj);
			}
			return arr;
		}

	})
	services.service('util', function() {
		//本地更新公众号数组
		this.updateGongzhonghao = function(arr, obj) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i]['tnickname'] == obj['tnickname']) {
					arr[i] = obj;
					break;
				}
			}

		}
		this.objIsEqual = function(a, b) {
			// 获取对象属性的所有的键
			var aProps = Object.getOwnPropertyNames(a);
			var bProps = Object.getOwnPropertyNames(b);

			// 如果键的数量不同，那么两个对象内容也不同
			if (aProps.length != bProps.length) {
				return false;
			}

			for (var i = 0, len = aProps.length; i < len; i++) {
				var propName = aProps[i];

				// 如果对应的值不同，那么对象内容也不同
				if (a[propName] !== b[propName]) {
					return false;
				}
			}

			return true;
		}
	})
	services.service('pageConfig', function() {
		this.limit = 10;
		this.curentPage = 1;
		this.pages = 1;
		this.total = 0;

		this.init = function() {
			this.limit = 10;
			this.curentPage = 1;
			this.pages = 1;
			this.total = 0;
		}
	});
	services.service('match', function() {
		this.isUrl = function(str) {
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(str)
		}
		this.hasSpace = function(str) {
			return /\s+/.test(str)
		}
	})

	services.service('modal', function($timeout) {

		var $alert;
		var $loading;
		var $confirm;

		//confirm
		this.confirmShow = function(content, okCb, cancleCb) {
			$confirm = $confirm || $('.confirm-modal');
			$confirm.find('.confirm-modal-content').text(content);
			$confirm.modal('show');

			$confirm.find('.ok').one('click', function() {
				if (okCb)
					okCb();
			})

			$confirm.find('.cancle').one('click', function() {
				if (cancleCb)
					cancleCb();
			})
		}

		this.confirmClose = function() {
			var $confirm = $confirm || $('.confirm-modal');
			$confirm.modal('hide');
		}

		// alert
		this.alertShow = function(content) {
			$alert = $alert || $('.alert-modal');
			$alert.find('.alert-modal-content').text(content);
			$alert.modal('show');

			$timeout(function() {
				$alert.modal('hide');
			}, 1000)

		}

		// loading
		this.loadingShow = function() {
			$loading = $loading || $('.loading-modal');
			$loading.modal('show');
		}

		this.loadingClose = function() {
			$loading = $loading || $('.loading-modal');
			$loading.modal('hide');
		}

		//gongzhonghao-edit-modal
		this.gongzhonghaoEditModalShow = null;
		this.gongzhonghaoEditModalClose = null;
		this.gongzhonghaoEditModalOkHandle = null;
		
		//topic-edit-modal
		this.topicAddModalShow = null;
		this.topicAddModalClose = null;
	})
})()