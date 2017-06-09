(function() {
	var pluginDirs = angular.module('pluginDirs', []);
	pluginDirs.directive('pTable', function(match, modal) {
		return {
			restrict: 'AE',
			replace: true,
			scope: false,
			templateUrl: 'tpls/plugin.table.html',
			link: function(scope, element, attr) {
				scope.isUrl = function(str) {
					var rst = match.isUrl(str);
					return rst;
				}

				element.delegate('.p-table-remove,.p-table-edit', 'click', function(e) {
					e.preventDefault();
				})

				scope.delDataHandle = function(data) {
					modal.confirmShow('是否要删除这条记录 ?', function() {
						scope.delData(data);
					});
				}
				scope.selectDataHandle = function(data) {
					scope.edit = true;
					scope.selectedData = angular.copy(data); //复制选中行数据，避免编辑时就已经反映到表格上
					modal.gongzhonghaoEditModalShow();
				}
				

			}
		}
	})
	pluginDirs.directive('pPager', function(pageConfig) {
		return {
			restrict: 'AE',
			replace: true,
			scope: false,
			templateUrl: 'tpls/plugin.pager.html',
			link: function(scope, element, attr) {

				//将数字转化成数据，用于ng-repeat
				scope.num2Arr = function(num) {
					return new Array(num);
				}

				//阻止a标签的默认事件
				element.delegate('a', 'click', function(e) {
					e.preventDefault();
				})

				//如果当前页码处于激活状态，则阻止该页码的后续事件，避免重复获取相同的数据
				element.delegate('li', 'click', function(e) {
					if ($(e.currentTarget).hasClass('active'))
						e.stopImmediatePropagation();
				})

				//页码点击事件
				element.delegate('.page-turn', 'click', function(e) {
					scope.pageConfig.curentPage = $(e.target).text();
					scope.getData();

					$(e.currentTarget)
						.addClass('active')
						.siblings().filter('.page-turn')
						.removeClass('active')
				})

				//下一页按钮点击事件
				element.find('.page-up').click(function(e) {
					var $active = element.find('.page-turn.active');
					var nextBtn = $active.find('+li.page-turn');

					if (nextBtn.length != 1) {
						return
					}

					$active.removeClass('active');
					nextBtn.addClass('active');

					scope.pageConfig.curentPage = parseInt($active.find('a').text()) + 1;
					scope.getData();

				})

				//上一页按钮点击事件
				element.find('.page-down').click(function(e) {
					var $active = element.find('.page-turn.active');
					var prevBtn = $active.prev('.page-turn');

					if (prevBtn.length != 1) {
						return
					}

					$active.removeClass('active');
					prevBtn.addClass('active');

					scope.pageConfig.curentPage = parseInt($active.find('a').text()) - 1;
					scope.getData();

				})
			}
		}
	})

	//还不知怎么提供方法给控制调用，其暴露的给控制器或者其他服务的功能写在了services.js里面
	pluginDirs.directive('pModal', function() {
		return {
			restrict: 'AE',
			replace: true,
			templateUrl: 'tpls/plugin.modal.html',
			link: function(scope, element, attr) {
				var $confirm = element.find('.confirm-modal');
				var $alert = element.find('.alert-modal');
				var $loading = element.find('.loading-modal');

				element.find('.close,.ok,.cancle').click(function(e) {
					$(e.target).parents('.modal').modal('hide');
				});

			}
		}
	})
})()